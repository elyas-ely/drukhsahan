import { ID, Query } from "react-native-appwrite"
import { appwriteConfig, databases, storage } from "../confiq"

// ============================================================
// POSTS
// ============================================================

// ============================== CREATE POST
export async function createPost(post) {
  const filesIds = []
  const filesUrls = []

  const price = parseInt(post.price, 10)
  if (isNaN(price)) {
    throw new Error("Price is not a valid integer")
  }

  try {
    // Upload files to Appwrite storage and get their URLs
    await Promise.all(
      post.images.map(async (photo) => {
        try {
          const uploadedFile = await uploadPostFile(photo)

          if (!uploadedFile) throw new Error("File upload failed")

          filesIds.push(uploadedFile.$id)

          // Get file URL
          const fileUrl = getPostFilePreview(uploadedFile.$id)
          filesUrls.push(fileUrl._j)

          if (!fileUrl) {
            await deletePostFile(uploadedFile.$id)
            throw new Error("Failed to generate file URL")
          }
        } catch (err) {
          throw new Error(`Error processing file: ${err.message}`)
        }
      })
    )

    // console.log("all files urls", filesUrls)

    // Create post
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        carName: post.carName,
        images: filesUrls,
        fuelType: post.fuelType,
        transmission: post.transmission,
        model: post.model,
        color: post.color,
        inpostation: post.inpostation,
        price,
        information: post.information,
        imagesIds: filesIds,
      }
    )

    // If the post creation fails, delete all uploaded files
    if (!newPost) {
      await Promise.all(filesIds.map((id) => deletePostFile(id)))
      throw new Error("Failed to create post")
    }

    return newPost
  } catch (error) {
    console.error(error.message) // Log error for debugging
    throw new Error(`Post creation failed: ${error.message}`)
  }
}

// upload Post File
export async function uploadPostFile(file) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.postsStorageId,
      ID.unique(),
      file
    )
    if (!uploadedFile) throw Error
    return uploadedFile
  } catch (error) {
    throw new Error(error)
  }
}

// Get File Preview
export async function getPostFilePreview(fileId) {
  if (!fileId) return

  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.postsStorageId,
      fileId
    )

    return fileUrl
  } catch (error) {
    throw new Error(error)
  }
}

// ============================== DELETE FILE
export async function deletePostFile(fileId) {
  try {
    await storage.deleteFile(appwriteConfig.postsStorageId, fileId)

    return { status: "ok" }
  } catch (error) {
    console.log(error)
  }
}

// ============================== GET RECENT POSTS
export async function getRecentPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    )

    if (!posts) throw Error

    return posts.documents
  } catch (error) {
    console.log(error)
  }
}

export async function getPapularPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.equal("papular", true), , Query.limit(20)]
    )

    if (!posts) throw Error

    return posts.documents
  } catch (error) {
    console.log(error)
  }
}

// ============================== LIKE / UNLIKE POST
export async function likePost(postId, likesArray) {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        likes: likesArray,
      }
    )

    if (!updatedPost) throw Error

    return updatedPost
  } catch (error) {
    console.log(error)
  }
}

// ============================== SAVE POST
export async function savePost(userId, postId, accountId) {
  try {
    const savePost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
        accountId,
      }
    )

    if (!savePost) throw Error

    return savePost
  } catch (error) {
    console.log(error)
  }
}

// ============================== GET SAVE POST

export async function getSavedPosts(accountId) {
  try {
    const getSavedPosts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      [Query.equal("accountId", accountId), Query.orderDesc("$createdAt")]
    )

    if (!getSavedPosts) throw Error

    return getSavedPosts.documents
  } catch (error) {
    console.log(error)
  }
}

// ============================== GET POST BY ID
export async function getPostById(postId) {
  if (!postId) throw Error

  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    )

    if (!post) throw Error

    return post
  } catch (error) {
    console.log(error)
  }
}

// ============================== GET USER'S POST
export async function getUserPosts(userId) {
  if (!userId) return

  try {
    const post = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    )

    if (!post) throw Error

    return post.documents
  } catch (error) {
    console.log(error)
  }
}

// ============================== GET POST BY FILTER
export const getFilterPosts = async (filters) => {
  // Check if the filters object has any non-empty, non-null, or non-undefined values
  const hasValues = Object.entries(filters).some(
    ([key, value]) => value !== "" && value !== null && value !== undefined
  )

  // Return an empty array if no meaningful filters are applied
  if (!hasValues) {
    return [] // Return an empty array to indicate no filters were applied
  }
  const queryFilters = []

  // Add all filters to queryFilters, using defaults for unselected ones
  if (filters.searchText) {
    queryFilters.push(Query.search("carName", filters.searchText))
  }
  if (filters.fuelType) {
    queryFilters.push(Query.equal("fuelType", filters.fuelType))
  }
  if (filters.transmission) {
    queryFilters.push(Query.equal("transmission", filters.transmission))
  }
  if (filters.model) {
    queryFilters.push(Query.equal("model", filters.model))
  }
  if (filters.color) {
    queryFilters.push(Query.equal("color", filters.color))
  }
  if (filters.sliderValue) {
    queryFilters.push(Query.lessThanEqual("price", filters.sliderValue))
  }
  // Exit the function if no filters are applied
  // if (queryFilters.length === 0) {
  //   return []
  // }
  // console.log(queryFilters);
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queryFilters.concat([Query.orderDesc("$createdAt")])
    )
    return posts.documents
  } catch (error) {
    throw new Error(error)
  }
}

// ============================== update POST
export async function updatePost(post, postImagesIds, postId) {
  const price = parseInt(post.price, 10)

  // Check if the price is a valid integer
  if (isNaN(price)) {
    console.log("Price is not a valid integer")
    return
  }
  post.price = price

  try {
    const { filesIds, filesUrls } = await processPostImages(post, postImagesIds)

    // Create post
    const newPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        carName: post.carName,
        images: filesUrls,
        fuelType: post.fuelType,
        transmission: post.transmission,
        model: post.model,
        color: post.color,
        inpostation: post.inpostation,
        price,
        information: post.information,
        imagesIds: filesIds,
      }
    )

    // If the post creation fails, delete all uploaded files
    if (!newPost) {
      await Promise.all(filesIds.map((id) => deletePostFile(id)))
      throw new Error("Failed to create post")
    }
    console.log("post updated successfully")

    return newPost
  } catch (error) {
    console.error(error.message) // Log error for debugging
    throw new Error(`Post creation failed: ${error.message}`)
  }
}
// ================================ HELPING FUNCTIONS ==========================================================

// ------------------------
const processPostImages = async (post, postImagesIds) => {
  const filesUrls = []
  let filesIds = []

  try {
    await Promise.all(
      post.images.map(async (photo) => {
        const { name, size, type, uri } = photo
        const isImageUpdated = name && size && type && uri

        if (isImageUpdated) {
          console.log("User has changed the images: ", photo)

          // Delete existing post images
          await deletePostImages(postImagesIds)

          // Upload new image
          const uploadedFile = await uploadPostFile(photo)
          if (!uploadedFile) throw new Error("File upload failed")

          console.log("File uploaded: ", uploadedFile)
          filesIds.push(uploadedFile.$id)

          // Generate file URL
          const fileUrl = getPostFilePreview(uploadedFile.$id)
          if (!fileUrl) {
            await deletePostFile(uploadedFile.$id)
            throw new Error("Failed to generate file URL")
          }

          filesUrls.push(fileUrl._j)
        } else {
          // Use existing image URI if image was not changed
          console.log("Image was not changed, reusing existing URI")
          filesUrls.push(photo)
          filesIds = postImagesIds
        }
      })
    )
  } catch (err) {
    console.error(`Error processing file: ${err.message}`)
    throw err
  }

  return { filesIds, filesUrls }
}

// ------------------------
const deletePostImages = async (postImagesIds) => {
  if (!postImagesIds || postImagesIds.length === 0) {
    console.log("No images to delete.")
    return
  }

  console.log("Attempting to delete the following image IDs:", postImagesIds)

  try {
    const deleteResults = await Promise.allSettled(
      postImagesIds.map((id) => deletePostFile(id))
    )

    deleteResults.forEach((result, index) => {
      const id = postImagesIds[index]
      if (result.status === "fulfilled") {
        console.log(`Image with ID ${id} successfully deleted.`)
      } else {
        console.error(
          `Failed to delete image with ID ${id}: ${result.reason.message}`
        )
      }
    })
  } catch (err) {
    console.error(
      "An unexpected error occurred while deleting images:",
      err.message
    )
  }
}

// ============================== DELETE POST
export async function deletePost(postId, imagesIds = [], savedPostId = null) {
  // console.log("Deleting post:", postId, "with images:", imagesIds)

  if (!postId || !Array.isArray(imagesIds) || imagesIds.length === 0) {
    console.warn("Invalid input: postId and imagesIds are required.")
    return
  }

  try {
    // Delete saved post if savedPostId is provided
    let savedPostDeletion = null

    if (savedPostId) {
      savedPostDeletion = await deleteSavedPost(savedPostId)

      if (savedPostDeletion?.status !== "Ok") {
        throw new Error(`Failed to delete saved post with ID: ${savedPostId}`)
      }
      console.log("save post deleted")
    }

    // Delete the main post
    const deletePost = await deleteMainPost(postId)

    if (!deletePost) {
      throw new Error("Failed to delete post with ID: " + postId)
    }

    // Delete associated images
    await deletePostImages(imagesIds)

    return { status: "Ok" }
  } catch (error) {
    console.error("Error deleting post:", error)
    return { status: "Error", message: error.message }
  }
}

// Helper function to delete saved posts
export async function deleteSavedPost(savedRecordId) {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    )

    if (!statusCode) throw Error

    return { status: "Ok" }
  } catch (error) {
    console.log(error)
  }
}

async function deleteMainPost(postId) {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    )
    return { status: "Ok" }
  } catch (error) {
    console.error("Error deleting main post:", error)
    return { status: "Error", message: error.message }
  }
}
