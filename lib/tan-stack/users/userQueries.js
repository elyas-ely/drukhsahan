import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query"
import {
  createUserAccount,
  getCurrentUser,
  signInAccount,
  signOutAccount,
  updateUser,
} from "../../appwrite/users/userApi"
import { QUERY_KEYS } from "../queryKeys"

// ============================================================
// AUTH QUERIES
// ============================================================

// ============================== CREATE ACCOUNT
export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user) => createUserAccount(user),
  })
}

// ============================== SIGN IN ACCOUNT
export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user) => signInAccount(user),
  })
}

// ============================== SIGN OUT ACCOUNT
export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  })
}

// ============================== GET CURREN USER
export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  })
}

// ============================== UPDATE CURREN USER'S DATA
export const useUpdateUser = (accountId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (user) => updateUser(user, accountId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_POSTS, data?.$id],
      })
    },
  })
}
