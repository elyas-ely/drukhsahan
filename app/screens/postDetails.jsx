import { View, Text, ActivityIndicator } from "react-native"
import Header from "@components/shared/Header"
import Icon from "@components/shared/Icon"
import { useTheme } from "@contexts/ThemeContext"
import ImageSlider from "@components/ImageSlider"
import CarSpecificationsSection from "@components/CarSpecificationsSection"
import { router, useLocalSearchParams } from "expo-router"
import CustomButton from "@components/shared/CustomButton"
import { mvs } from "react-native-size-matters"
import { paddingHor } from "@functions"
import { useGetPostById } from "../../lib/tan-stack/posts/postQueries"
import { DateFormatter } from "../../utils/DateFormatter"
import { Image } from "expo-image"
import { blurhash } from "@utils"
import MoreMenu from "../../components/shared/MoreMenu"
import LikePost from "../../components/shared/LikePost"

export default function CarDetails() {
  const { colors } = useTheme()
  const { postId } = useLocalSearchParams()

  const { data: post, isPending } = useGetPostById(postId || "")

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        rightIcon="ChevronRight"
        title="موتر معلومات"
        leftIcons={
          <View className="flex-row items-center">
            <LikePost hideQuantity={true} post={post} />
            <MoreMenu big={true} post={post} />
          </View>
        }
      />
      {isPending ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          <View className="flex-1">
            {/* ============= post specifications ================== */}
            <CarSpecificationsSection
              header={
                <>
                  {/* ============== image slider */}
                  <View style={{ marginTop: mvs(20) }}>
                    <ImageSlider images={post?.images} />
                  </View>
                  <View
                    style={{
                      marginVertical: mvs(25),
                      paddingHorizontal: paddingHor,
                    }}
                    className=" flex-row justify-between "
                  >
                    {/* ======== name and price =========== */}
                    <View>
                      <Text
                        style={{ color: colors.primaryText }}
                        className="text-[20px] font-rBold mb-[5px] "
                      >
                        {post?.carName}
                      </Text>
                      {/* <Text
                        style={{ color: colors.secondaryText }}
                        className="text-[13px] font-rRegular"
                      >
                        هابریډ AWD 199KW
                      </Text> */}
                    </View>
                    <View className="flex-row items-center ">
                      <Text
                        style={{ color: colors.primary }}
                        className="text-[18px] font-rBold"
                      >
                        {post?.price}
                      </Text>
                      <Icon
                        name="FilledCoin"
                        fill={colors.primary}
                        width={20}
                        height={20}
                      />
                    </View>
                  </View>
                </>
              }
              specifications={post}
              footer={
                <>
                  <View
                    style={{
                      paddingHorizontal: paddingHor,
                      marginTop: mvs(25),
                    }}
                  >
                    <Text
                      style={{ color: colors.primaryText }}
                      className="text-[20px] font-rBold mb-[5px] "
                    >
                      معلومات
                    </Text>
                    <Text
                      style={{ color: colors.primaryText }}
                      className="text-[16px] font-rRegular "
                    >
                      {post?.information}
                    </Text>
                  </View>
                </>
              }
            />
          </View>

          {/* =========== contact ============ */}

          <View
            style={{
              backgroundColor: colors.secondaryBackground,
              borderColor: colors.borderColor,
              elevation: 10,
            }}
            className="flex-row justify-between items-center px-5 py-[12px]  rounded-tr-[10px] rounded-tl-[10px]"
          >
            {/* ========== user info ======= */}
            <View className="flex-row">
              {/* user Image container */}
              <View className="w-[45px] h-[45px] mr-2.5 rounded-full overflow-hidden">
                <Image
                  className="w-full h-full"
                  contentFit="cover"
                  placeholder={{ blurhash }}
                  source={{
                    uri: post?.creator?.profile,
                  }}
                />
              </View>

              {/* ========= username and date ===== */}
              <View>
                <Text
                  style={{ color: colors.primaryText }}
                  className="text-[18px] mb-[3px] font-rMedium text-left "
                >
                  {post?.creator.name}
                </Text>

                <Text
                  style={{ color: colors.secondaryText }}
                  className="text-[14px] font-rRegular text-left "
                >
                  {DateFormatter(post?.$createdAt)}
                </Text>
              </View>
            </View>
            <CustomButton
              handlePress={() => router.push("screens/secondaryProfileScreen")}
              title="تماس"
            />
          </View>
        </>
      )}
    </View>
  )
}
