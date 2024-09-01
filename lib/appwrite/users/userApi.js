import { ID, Query } from "react-native-appwrite"
import { account, appwriteConfig, avatars, databases, storage } from "../confiq"
import { isEmpty } from "@utils/utils"

// ============================================================
// AUTH
// ============================================================

// ============================== SIGN UP
export async function createUserAccount(user) {
  try {
    const newAccount = await account.create(
      ID.unique(),

      user.email,
      user.password,
      user.name
    )

    if (!newAccount) return console.log("new account not created")

    const avatarUrl = avatars.getInitials(user.name)

    const userDetails = {
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      profile: avatarUrl,
      background: avatarUrl,
    }

    const newUser = await saveUserToDB(userDetails)

    return newUser
  } catch (error) {
    console.log(error)
    return error
  }
}

// ============================== SAVE USER TO DB
export async function saveUserToDB(userDetails) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      userDetails
    )

    return newUser
  } catch (error) {
    console.log(error)
  }
}

// ============================== SIGN IN
export async function signInAccount(user) {
  try {
    const session = await account.createEmailSession(user.email, user.password)

    return session
  } catch (error) {
    console.log(error)
  }
}

// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get()

    return currentAccount
  } catch (error) {
    console.log(error)
  }
}

// ============================== GET CURRENT USER'S DATA
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount()

    if (!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    )

    if (!currentUser) throw Error

    return currentUser.documents[0]
  } catch (error) {
    console.log(error)
    return null
  }
}

// ============================== SIGN OUT
export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current")

    return session
  } catch (error) {
    console.log(error)
  }
}

// upload user File
export async function uploadUserFile(file) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.usersStorageId,
      ID.unique(),
      file
    )
    if (!uploadedFile) throw Error
    return uploadedFile
  } catch (error) {
    throw new Error(error)
  }
}

export async function getUserFilePreview(fileId) {
  if (!fileId) return

  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.usersStorageId,
      fileId
    )

    return fileUrl
  } catch (error) {
    throw new Error(error)
  }
}

export async function deleteUserFile(fileId) {
  try {
    await storage.deleteFile(appwriteConfig.usersStorageId, fileId)

    return { status: "ok" }
  } catch (error) {
    console.log(error)
  }
}

// ============================================================
// USER
// ============================================================

// ============================== UPDATE USER
export async function updateUser(user, accountId) {
  if (!accountId) {
    console.log("Account ID is missing")
    return
  }

  if (!user || Object.values(user).every(isEmpty)) {
    console.log("No user data provided")
    return
  }

  try {
    const updatedData = {}

    const hasBackground = user.background.length > 0

    const hasProfile = user.profile.length > 0
    // Check and upload profile image if provided
    if (hasProfile && !user.profileImgId) {
      await handleFileUpload(user.profile[0], "profile", updatedData)
    } else if (hasProfile && user.profileImgId) {
      await handleFileUpload(
        user.profile[0],
        "profile",
        updatedData,
        user.profileImgId
      )
    } else {
      console.log("no profle")
    }

    if (hasBackground && !user.backgroundImgId) {
      await handleFileUpload(user.background[0], "background", updatedData)
    } else if (hasBackground && user.backgroundImgId) {
      await handleFileUpload(
        user.background[0],
        "background",
        updatedData,
        user.backgroundImgId
      )
    } else {
      console.log("no background")
    }

    // List of fields to check and assign
    const fields = [
      "username",
      "bio",
      "location",
      "phoneNumber",
      "whatsapp",
      "facebook",
      "x",
    ]

    // Iterate over each field and assign if present and non-empty
    fields.forEach((field) => {
      if (user[field] && user[field].trim() !== "") {
        updatedData[field] = user[field]
      }
    })
    console.log("updated data about to update", updatedData)

    // Update user document only if there is something to update
    if (Object.keys(updatedData).length > 0) {
      const updatedUser = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        accountId,
        updatedData
      )

      if (!updatedUser) {
        throw new Error("Failed to update user")
      }
      return updatedUser
    }

    console.log("No changes to update")
    return updatedData
  } catch (error) {
    console.error("Error updating user:", error.message)
  }
}

// Utility function to handle file upload and URL retrieval
const handleFileUpload = async (file, key, updatedData, imageId = "") => {
  if (!file) {
    console.error(`Error: No file provided for ${key}`)
    return null
  }

  try {
    // Delete the previous file if imageId exists
    if (imageId) {
      const deletePrevProfile = await deleteUserFile(imageId)
      if (!deletePrevProfile) {
        throw new Error(`Failed to delete previous ${key}`)
      }
      console.log(`Previous ${key} deleted`)
    } else {
      console.log(`No previous ${key}`)
    }

    // Upload the new file
    console.log(`Uploading ${key} file...`)
    const uploadedFile = await uploadUserFile(file)
    if (!uploadedFile) {
      throw new Error(`File for ${key} did not upload`)
    }

    // Generate and verify file URL
    const fileUrl = await getUserFilePreview(uploadedFile.$id)
    if (!fileUrl) {
      await deleteUserFile(uploadedFile.$id)
      throw new Error(`Failed to generate preview for ${key}`)
    }
    console.log(`getting ${fileUrl} file...`)

    // Update data with new file information
    updatedData[key] = fileUrl
    updatedData[`${key}ImgId`] = uploadedFile.$id

    console.log(`${key} file uploaded successfully`)
    return uploadedFile
  } catch (error) {
    console.error(`Error uploading file for ${key}:`, error.message)
    return null
  }
}
