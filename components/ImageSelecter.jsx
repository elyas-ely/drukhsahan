import { View, Text, TouchableOpacity } from "react-native"
import { useTheme } from "@contexts/ThemeContext"
import Icon from "./shared/Icon"
import { mvs, vs } from "react-native-size-matters"
import { paddingHor } from "@functions"
import ImageSlider from "./ImageSlider"
import { pickImage } from "../utils/imageSyncService"

export default function ImageSelecter({ images, setForm }) {
  const { colors } = useTheme()

  const pickImageService = async () => {
    try {
      await pickImage(setForm)
    } catch (error) {
      console.error("Error picking image:", error)
    }
  }

  return (
    <View
      style={{
        marginTop: mvs(20),
      }}
    >
      {images.length > 0 ? (
        <TouchableOpacity onPress={pickImageService}>
          <ImageSlider images={images} />
        </TouchableOpacity>
      ) : (
        <View
          style={{
            height: vs(190),
            paddingHorizontal: paddingHor,
          }}
        >
          <TouchableOpacity
            onPress={pickImageService}
            style={{
              elevation: 3,
              shadowColor: colors.shadowColor,
              backgroundColor: colors.secondaryBackground,
            }}
            className="w-full rounded-[15px]  h-full justify-center items-center"
          >
            <Icon
              name="Image"
              width={50}
              height={50}
              stroke={colors.secondaryText}
              strokeWidth={2}
            />
            <Text
              style={{ color: colors.secondaryText }}
              className="text-[18px] font-rMedium mt-2.5"
            >
              انځور انتخاب
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
