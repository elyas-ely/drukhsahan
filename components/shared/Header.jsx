import Icon from "@components/shared/Icon"
import { useTheme } from "@contexts/ThemeContext"
import { router, usePathname } from "expo-router"
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native"
import BageIcon from "./BageIcon"
import CustomButton from "./CustomButton"
import { useState } from "react"
import MoreMenu from "./MoreMenu"
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar"
import CustomeTouchableOpacity from "./CustomTouchableOpacity"
import { s, vs, ms, mvs } from "react-native-size-matters"
import { paddingHor } from "@functions"

export default function Header({
  rightIcon,
  leftIcons,
  title,
  logo,
  leftIcon,
  leftBageIcon,
  secondaryLogo,
  leftButton,
  leftButtonTitle,
  searchInput,
  toggleModel,
  handleRightIcon,
  removePaddingTop,
  filter,
  handleLeftButton,
  secondLeftButton,
  handleSecondLeftButton,
  borderNone,
}) {
  const { colors, activeTheme } = useTheme()
  const pathname = usePathname()
  const [isLiked, setIsLiked] = useState(false)
  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const statusBarStyle =
    pathname === "(tabs)/profile"
      ? "light"
      : activeTheme === "Light"
      ? "dark"
      : "light"
  return (
    <>
      <ExpoStatusBar style={statusBarStyle} />
      <View
        className={` pb-[12px] ${!borderNone && "border-b "}  `}
        style={{
          paddingTop: removePaddingTop ? 5 : StatusBar.currentHeight + 5,
          backgroundColor: colors.secondaryBackground,
          borderColor: colors.borderColor,
          paddingHorizontal: paddingHor,
        }}
      >
        <View className="flex-row items-center justify-between">
          {/* logo and left icon */}
          {logo && (
            <View className="h-[35px] w-[140px]">
              <Image
                className="h-full w-full"
                source={require("@assets/images/originalLogo.png")}
                resizeMode="contain"
              />
            </View>
          )}
          {rightIcon && (
            <CustomeTouchableOpacity
              otherStyles={"mr-2.5 -ml-[13.5px]"}
              marginLeft
              onPress={handleRightIcon ? handleRightIcon : () => router.back()}
            >
              <Icon name={rightIcon} strokeWidth={2} />
            </CustomeTouchableOpacity>
          )}

          {/* middle part which is title */}
          {title && (
            <Text
              style={{ color: colors.primaryText }}
              className="text-[22px] font-rBold flex-1 mx-[5px] "
            >
              {title}
            </Text>
          )}

          {searchInput && <View className="flex-1 ">{searchInput}</View>}

          {secondaryLogo && (
            <View className="h-[35px] w-[35px]">
              <Image
                className="h-full w-full"
                source={require("@assets/images/logo.png")}
                resizeMode="contain"
              />
            </View>
          )}
          <View className="flex-row">
            {leftButton && (
              <CustomButton
                title={leftButtonTitle}
                headerButton={true}
                handlePress={handleLeftButton}
              />
            )}
            {secondLeftButton && (
              <CustomButton
                title="بیا تنظیم"
                headerButton={true}
                simple={true}
                handlePress={handleSecondLeftButton}
                otherStyles={"ml-2.5"}
              />
            )}
          </View>

          {filter && filter}

          {/* Right Icon && right icons */}
          {leftIcons && leftIcons}
          {leftBageIcon && <BageIcon iconName={leftBageIcon} />}
          {leftIcon && (
            <CustomeTouchableOpacity marginRight onPress={toggleModel}>
              <Icon name={leftIcon} strokeWidth={2} />
            </CustomeTouchableOpacity>
          )}
        </View>
      </View>
    </>
  )
}
