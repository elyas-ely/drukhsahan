export const checkIsLiked = (likes, userId) => {
  const isLiked = likes?.includes(userId)
  return isLiked
}
