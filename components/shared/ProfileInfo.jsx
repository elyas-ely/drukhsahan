import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Share,
} from "react-native"
import { useTheme } from "@contexts/ThemeContext"
import { cars } from "@constants/data.json"
import PostCard from "./PostCard"
import Contact from "../Contact"
import Icon from "./Icon"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import CustomeTouchableOpacity from "./CustomTouchableOpacity"
import { mvs, vs } from "react-native-size-matters"
import { paddingHor } from "@functions"
import { blurhash } from "../../utils"
import { Image } from "expo-image"
import { useGlobalContext } from "@contexts/GlobalProvider"
import { useGetUserPosts } from "../../lib/tan-stack/posts/postQueries"

export default function ProfileInfo({ otherUser }) {
  const { colors } = useTheme()
  const { user } = useGlobalContext()

  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
    error,
    refetch,
  } = useGetUserPosts(user?.$id)

  const handleShare = async () => {
    try {
      await Share.share({ message: "Check out this post!" })
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  const getAllLikes = posts?.map((post) => post.likes.length)

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={{ height: vs(190) }} className="w-full ">
              <Image
                placeholder={{ blurhash }}
                className="w-full h-full"
                source={{ uri: user?.background }}
              />
              <LinearGradient
                colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.05)"]}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                }}
                start={{ x: 0, y: 0 }} // Start at the top
                end={{ x: 0, y: 1 }} // End at the bottom
              >
                <View
                  style={{
                    paddingTop: StatusBar.currentHeight,
                    paddingBottom: otherUser ? 10 : 0,
                  }}
                >
                  {otherUser && (
                    <View className="flex-row items-center justify-between w-full px-5 pt-1 pb-1">
                      <TouchableOpacity onPress={handleShare}>
                        <Icon name="Share" fill={colors.buttonText} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => router.back()}>
                        <Icon
                          name="ChevronLeft"
                          stroke={colors.buttonText}
                          strokeWidth={2}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </LinearGradient>
            </View>
            {/* ========= about moter store */}
            <View
              className=" rounded-b-[15px]"
              style={{
                backgroundColor: colors.secondaryBackground,
                elevation: 10,
                shadowColor: colors.shadowColor,
              }}
            >
              <View
                style={{ paddingHorizontal: paddingHor }}
                className="pt-2.5  flex-row items-center "
              >
                {/* ======== second profile image ======= */}
                <View
                  style={{
                    borderColor: colors.secondaryBackground,
                    borderWidth: 4,
                  }}
                  className="w-[80px] h-[80px] rounded-full overflow-hidden -mt-10 z-20 "
                >
                  <Image
                    placeholder={{ blurhash }}
                    className="w-full h-full"
                    source={{ uri: user?.profile }}
                  />
                </View>
                <View className="ml-2.5 flex-1 ">
                  <Text
                    style={{ color: colors.primaryText }}
                    className="text-[20px] font-rMedium text-left "
                  >
                    {user.username}
                  </Text>
                  <Text
                    style={{ color: colors.secondaryText }}
                    className="text-[16px] font-rRegular  "
                  >
                    {user?.location}
                  </Text>
                </View>
                {!otherUser && (
                  <View>
                    <CustomeTouchableOpacity
                      onPress={() => router.push("screens/settingsScreen")}
                    >
                      <Icon name="Settings" />
                    </CustomeTouchableOpacity>
                  </View>
                )}
              </View>
              <View
                style={{
                  paddingHorizontal: paddingHor,
                  paddingVertical: mvs(20),
                }}
              >
                <Text
                  style={{ color: colors.primaryText }}
                  className="text-[20px] font-rMedium"
                >
                  هر ډول موټر د افغان شورم څخه ترلاس کړی په مناسب قیمت
                </Text>
                <Text
                  style={{ color: colors.secondaryText }}
                  className="text-[16px] font-rRegular mt-2.5  "
                >
                  {user?.bio}
                </Text>
              </View>
            </View>

            {/* links for contacts */}
            <Contact allPosts={posts?.length} allLikes={getAllLikes} />
          </>
        }
        data={posts}
        keyExtractor={(post) => post?.$id}
        renderItem={({ item }) => <PostCard post={item} />}
        ItemSeparatorComponent={() => <View className="h-[15px]"></View>}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
