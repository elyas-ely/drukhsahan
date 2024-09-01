import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query"
import {
  createPost,
  deleteSavedPost,
  getPostById,
  getRecentPosts,
  savePost,
  searchPosts,
  getSegmentPosts,
  getFilterPosts,
  getUserPosts,
  updatePost,
  likePost,
  deletePost,
  fetchSavePost,
  getSavedPosts,
  getPapularPosts,
} from "../../appwrite/posts/postApi"
import { QUERY_KEYS } from "../queryKeys"

// ============================================================
// POST QUERIES
// ============================================================

// ============================== CREATE POST
export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (post) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SAVED_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FILTER_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SEARCH_POSTS],
      })
    },
  })
}

// ============================== GET RECENT POSTS
export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  })
}

// ============================== GET papular POSTS
export const useGetPapularPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PAPULAR_POSTS],
    queryFn: getPapularPosts,
  })
}

// ============================== LIKE & UNLIKE POST
export const useLikePost = (postId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (likesArray) => likePost(postId, likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SAVED_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FILTER_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SEARCH_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PAPULAR_POSTS],
      })
    },
  })
}

// ============================== SAVE POST
export const useSavePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, postId, accountId }) =>
      savePost(userId, postId, accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SAVED_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FILTER_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SEARCH_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PAPULAR_POSTS],
      })
    },
  })
}

// ============================== GET SAVE POST

export const useGetSavedPosts = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SAVED_POSTS, userId],
    queryFn: () => getSavedPosts(userId),
    // enabled: !!userId,
  })
}

// ============================== DELETE SAVED POST
export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (savedRecordId) => deleteSavedPost(savedRecordId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SAVED_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FILTER_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PAPULAR_POSTS],
      })
    },
  })
}

// ============================== GET POST BY ID
export const useGetPostById = (postId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  })
}

// ============================== SEARCH POSTS BY QUERY
export const useSearchPosts = (searchValue) => {
  return useQuery({
    enabled: false,
    queryKey: [QUERY_KEYS.GET_SEARCH_POSTS, searchValue],
    queryFn: () => searchPosts(searchValue),
  })
}

// ============================== Get POSTS BY FILTER
export const useFilterPosts = (filters) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FILTER_POSTS, filters],
    queryFn: () => getFilterPosts(filters),
    // enabled: false,
  })
}

// ============================== GET USER'S POSTS
export const useGetUserPosts = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_POSTS],
    queryFn: () => getUserPosts(userId),
    // enabled: !!userId,
  })
}

// ============================== UPDATE USER'S POSTS
export const useUpdatePost = (postImagesIds, postId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (post) => updatePost(post, postImagesIds, postId),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SAVED_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FILTER_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SEARCH_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PAPULAR_POSTS],
      })
    },
  })
}

// ============================== DELETE USER'S POSTS
export const useDeletePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ postId, imagesIds, savedPostId }) =>
      deletePost(postId, imagesIds, savedPostId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SAVED_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FILTER_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SEARCH_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PAPULAR_POSTS],
      })
    },
  })
}
