import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native"
import { useTheme } from "@contexts/ThemeContext"
import Icon from "@components/shared/Icon"
import { useState } from "react"
import { router } from "expo-router"
import MoreMenu from "./MoreMenu"
import { ms, mvs, vs } from "react-native-size-matters"
import { paddingHor } from "@functions"
import { Image } from "expo-image"
import { blurhash } from "../../utils"
import { DateFormatter } from "../../utils/DateFormatter"
import LikePost from "./LikePost"

export default function PostCard({ post }) {
  const { colors } = useTheme()
  const [isLiked, setIsLiked] = useState(false)
  const [isShowinformation, setIsShowinformation] = useState(false)

  const information = () => {
    const { width } = useWindowDimensions()
    const baseCharLimit = 80
    const charLimit = baseCharLimit + Math.floor((width - 360) / 4.2)
    const postinformation = post?.information || ""

    return (
      <Text
        style={{ color: colors.primaryText }}
        className="text-[16px] font-rRegular "
      >
        {!isShowinformation && postinformation.length > charLimit
          ? `${postinformation.substring(0, charLimit)}...`
          : postinformation}
      </Text>
    )
  }
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
        elevation: 10,
        shadowColor: colors.shadowColor,
        paddingHorizontal: paddingHor,
        paddingVertical: ms(15),
      }}
      className=" rounded-[15px] "
    >
      {/* ===== post header ====== */}

      <View className="flex-row justify-between  ">
        <View className="flex-row  flex-1">
          <View className="w-[45px] h-[45px] mr-2.5 rounded-full overflow-hidden">
            <Image
              placeholder={{ blurhash }}
              className="w-full h-full"
              contentFit="cover"
              source={{ uri: post && post?.creator?.profile }}
            />
          </View>

          <View className="flex-1">
            <View className="flex-row items-center  justify-between  ">
              <Text
                style={{ color: colors.primaryText }}
                className="text-[18px] mb-[3px] font-rMedium  "
              >
                {post && post?.creator?.username}
              </Text>

              <MoreMenu post={post} />
            </View>

            <Text
              style={{ color: colors.secondaryText }}
              className="text-[14px] font-rRegular -mt-[3px] text-left"
            >
              {DateFormatter(post?.$createdAt)}
            </Text>
          </View>
        </View>
      </View>

      {/* =========== Post information ======== */}

      <View className="my-5">
        {/* title */}
        <Text
          style={{ color: colors.primaryText, marginBottom: mvs(10) }}
          className="text-[17px] font-rBold text-left  "
        >
          {post && post?.carName}
        </Text>
        <Text className="text-left">
          {information()}{" "}
          <TouchableOpacity
            onPress={() => setIsShowinformation(!isShowinformation)}
          >
            <Text
              style={{ color: colors.primary }}
              className="font-rBold text-[16px]  "
            >
              {isShowinformation ? "لږ ووینی" : "نور ووینی"}
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
      {/* ========== Post Image Container ======== */}
      <TouchableWithoutFeedback onPress={handleNavigate}>
        <View
          style={{ height: vs(190) }}
          className="w-full h-[190px] rounded-[10px] overflow-hidden"
        >
          <Image
            className="w-full h-full"
            source={{ uri: post?.images && post?.images[0] }}
            contentFit="cover"
            placeholder={{ blurhash }}
          />
        </View>
      </TouchableWithoutFeedback>

      {/* ========== Post Footer ======= */}

      <View className="flex-row justify-between items-center mt-5">
        <View className="flex-row items-center ">
          <Text
            style={{ color: colors.primary }}
            className="text-[16px] font-rBold"
          >
            {post?.price}
          </Text>
          <Icon
            name="FilledCoin"
            fill={colors.primary}
            width={18}
            height={18}
          />
        </View>

        {/* ======== like ======= */}
        <LikePost post={post} />
      </View>
    </View>
  )
}
