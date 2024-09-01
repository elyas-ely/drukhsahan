import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native"
import { useTheme } from "@contexts/ThemeContext"
import Icon from "@components/shared/Icon"
import { useState } from "react"
import { shortText } from "@functions"
import { router } from "expo-router"
import MoreMenu from "./shared/MoreMenu"
import { Image } from "expo-image"
import { blurhash } from "../utils"
import LikePost from "./shared/LikePost"

export default function PopularChoicespostd({ post }) {
  const { colors } = useTheme()
  const [isLiked, setIsLiked] = useState(false)

  const handleNavigate = () => {
    router.push({
      pathname: "screens/postDetails",
      params: { postId: post?.$id },
    })
  }
  return (
    <View
      style={{
        backgroundColor: colors.secondaryBackground,
        elevation: 5,
        shadowColor: colors.shadowColor,
      }}
      className="  mb-2.5 w-[240px]  rounded-[15px] overflow-hidden"
    >
      {/* ===== imageContainer ====== */}
      <TouchableWithoutFeedback onPress={() => handleNavigate()}>
        <View className="w-full h-[150px]">
          <Image
            placeholder={{ blurhash }}
            className="w-full h-full"
            source={{ uri: post?.images && post?.images[0] }}
          />
        </View>
      </TouchableWithoutFeedback>

      {/* ===== main Content ====== */}

      <View className=" p-[15px] pt-2.5   ">
        {/* ====== title and icon ==== */}
        <View className="flex-row justify-between items-center  ">
          <Text
            style={{ color: colors.primaryText }}
            className=" text-[17px] font-rBold"
          >
            {post?.carName}
          </Text>
          <MoreMenu post={post} />
        </View>

        {/* ======= description ======== */}
        <View className="mt-[3px] mb-2.5  ">
          <Text
            style={{ color: colors.primaryText }}
            className="text-[16px] font-rRegular text-left "
          >
            {shortText(post?.information.length, 55, post?.information)}
          </Text>
        </View>

        {/* ========== like and price ====== */}
        <View className="flex-row justify-between   ">
          <View className="flex-row items-center ">
            <Text
              style={{ color: colors.primary }}
              className="text-[16px] font-rBold"
            >
              {post && post.price}
            </Text>
            <Icon
              name="FilledCoin"
              fill={colors.primary}
              width={18}
              height={18}
            />
          </View>
          <LikePost post={post} />
        </View>
      </View>
    </View>
  )
}
