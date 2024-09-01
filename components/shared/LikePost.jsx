import { View, Text, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import { useLikePost } from "../../lib/tan-stack/posts/postQueries"
import { useGetCurrentUser } from "../../lib/tan-stack/users/userQueries"
import { useTheme } from "@contexts/ThemeContext"

import { checkIsLiked } from "../../utils/checkIsLike"
import Icon from "./Icon"

export default function LikePost({ post, hideQuantity = false }) {
  const { colors } = useTheme()
  const { data: currentUser } = useGetCurrentUser()

  const [likes, setLikes] = useState([])
  const [isLiked, setIsLiked] = useState(false)
  const { mutate: likePost } = useLikePost(post?.$id || "")

  // Handle the like post action
  const handleLikePost = () => {
    const userId = currentUser?.$id

    // Optimistically update the UI
    const updatedLikes = isLiked
      ? likes.filter((id) => id !== userId)
      : [...likes, userId]

    setLikes(updatedLikes)
    setIsLiked(!isLiked)

    // Send the updated likes to the server
    likePost(updatedLikes, {
      onError: () => {
        // Rollback the UI in case of an error
        setLikes(likes)
        setIsLiked(isLiked)
      },
    })
  }

  // Initialize likes state when the component mounts or the post changes
  useEffect(() => {
    if (post) {
      const likeIds = post?.likes?.map((user) => user.$id) || []
      setLikes(likeIds)
      setIsLiked(likeIds.includes(currentUser?.$id))
    }
  }, [post, currentUser])

  return (
    <TouchableOpacity
      onPress={handleLikePost}
      className="flex-row items-center"
    >
      {!hideQuantity && (
        <Text
          style={{ color: colors.primaryText }}
          className="text-[14px] font-rRegular mr-[3px]"
        >
          {likes.length}
        </Text>
      )}

      <Icon name="Heart" fill={isLiked ? "coral" : colors.disabbled} />
    </TouchableOpacity>
  )
}
