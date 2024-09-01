import { View, Text, TouchableOpacity, Pressable } from "react-native"
import { useTheme } from "@contexts/ThemeContext"
import Icon from "./Icon"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { router } from "expo-router"
import MoreMenu from "./MoreMenu"
import { makeTextShort } from "@functions"
import { ms } from "react-native-size-matters"
import { Image } from "expo-image"
import { blurhash } from "../../utils"
import LikePost from "./LikePost"

export default function RowCard({ post, isFavorite }) {
  const { colors } = useTheme()

  const handleNavigate = () => {
    router.push({
      pathname: "screens/postDetails",
      params: { postId: post?.$id },
    })
  }
  return (
    <View>
      <View
        style={{
          backgroundColor: colors.secondaryBackground,
          elevation: 5,
          shadowColor: colors.shadowColor,
        }}
        className="  rounded-[15px] overflow-hidden p-2.5 pr-[15px]  flex-row"
      >
        {/* ======= image container ======== */}
        <TouchableWithoutFeedback onPress={() => handleNavigate()}>
          <View className="w-[125px]  h-[108px] rounded-[10px] overflow-hidden ">
            <Image
              placeholder={{ blurhash }}
              className="w-full h-full"
              source={{ uri: post?.images[0] }}
            />
          </View>
        </TouchableWithoutFeedback>

        {/* =============== mainContent ========== */}
        <View style={{ paddingLeft: ms(15) }} className="  flex-1">
          <View className="flex-row justify-between items-center ">
            <Text
              style={{ color: colors.primaryText }}
              className="text-[17px] font-rBold"
            >
              {post?.carName}
            </Text>
            <Pressable>
              <MoreMenu post={post} />
            </Pressable>
          </View>
          {/* ======= description ======== */}
          <View className="my-[8px] flex-1">
            <Text
              style={{ color: colors.primaryText }}
              className="text-[15px] font-rRegular -mt-[7px] text-left "
            >
              {makeTextShort(post?.information.length, 40, post?.information)}
            </Text>
          </View>

          {/* ========== like and price ====== */}
          <View className="flex-row justify-between items-center">
            {/* ======== price ====== */}
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
      </View>
    </View>
  )
}
