import * as ImagePicker from "expo-image-picker"
import * as ImageManipulator from "expo-image-manipulator"
import * as FileSystem from "expo-file-system"
import { Alert } from "react-native"

export const pickImage = async (
  setForm,
  userEdit = false,
  imageType = "images"
) => {
  try {
    // Request media library permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== "granted") {
      return Alert.alert(
        "Permission required",
        "Permission to access the media library is required!"
      )
    }

    // Launch image picker
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: !userEdit,
      selectionLimit: userEdit ? 1 : 5,
      aspect: [4, 3],
      quality: 1,
    })

    if (pickerResult.canceled) return

    const selectedAssets = pickerResult.assets || []

    if (selectedAssets.length > 0) {
      // Process and reduce the size of each selected image
      const selectedImages = await Promise.all(
        selectedAssets.map(async ({ fileName, fileSize, mimeType, uri }) => {
          // Log original file size
          // console.log(`Original size of ${fileName}: ${fileSize / 1024} KB`)

          // Reduce image size and quality similar to WhatsApp
          const reducedUri = await compressAndResizeImage(uri)
          const reducedFileSize = await getFileSize(reducedUri)

          // Log reduced file size
          // console.log(
          //   `Reduced size of ${fileName}: ${reducedFileSize / 1024} KB`
          // )

          return {
            name: fileName,
            size: reducedFileSize,
            type: mimeType,
            uri: reducedUri,
          }
        })
      )

      setForm((prev) => ({
        ...prev,
        [imageType]: selectedImages,
      }))
    }
  } catch (error) {
    console.error("Error picking image:", error)
    Alert.alert(
      "Error",
      "An error occurred while picking the image. Please try again."
    )
  }
}

async function compressAndResizeImage(uri) {
  // Resize image to a smaller resolution
  const resizedImage = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 800 } }], // Resize to a width of 800px
    { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG } // Apply initial compression
  )

  // Check if image needs further compression and ensure image size does not go below 200KB
  const finalUri = await maintainMinSize(resizedImage.uri)
  return finalUri
}

async function maintainMinSize(uri) {
  const minSize = 200 * 1024 // 200KB in bytes

  // Check current file size
  let fileSize = await getFileSize(uri)

  // If file size is already less than or equal to 200KB, skip further processing
  if (fileSize <= minSize) {
    return uri
  }

  // If file size exceeds 200KB, compress iteratively to reduce to around 200KB
  let compress = 0.6 // Initial compression quality
  while (fileSize > minSize && compress > 0) {
    const manipResult = await ImageManipulator.manipulateAsync(uri, [], {
      compress,
      format: ImageManipulator.SaveFormat.JPEG,
    })

    uri = manipResult.uri
    fileSize = await getFileSize(uri)
    compress -= 0.1 // Reduce compression quality

    // If the file size is less than or equal to 200KB, break the loop
    if (fileSize <= minSize) {
      break
    }
  }

  return uri
}

async function getFileSize(uri) {
  const info = await FileSystem.getInfoAsync(uri)
  return info.size
}
