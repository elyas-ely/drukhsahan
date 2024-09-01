import {
  Account,
  Avatars,
  Client,
  Databases,
  Storage,
} from "react-native-appwrite"

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_URL,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  postsStorageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_POSTS_ID,
  usersStorageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_USERS_ID,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
  postCollectionId: process.env.EXPO_PUBLIC_APPWRITE_POST_COLLECTION_ID,
  savesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_SAVES_COLLECTION_ID,
}

export const client = new Client()

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform)

export const account = new Account(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)
export const databases = new Databases(client)
