import React, { useState, useEffect, useRef } from "react"
import { View, Dimensions, FlatList, Animated } from "react-native"
import { useTheme } from "@contexts/ThemeContext"
import { vs, mvs } from "react-native-size-matters"
import { paddingHor } from "@functions"
import { Image } from "expo-image"
import { blurhash } from "../utils/index"

const ImageSlider = ({ images, auto = false }) => {
  const { colors } = useTheme()
  const width = Dimensions.get("screen").width
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for forward, -1 for backward
  const scrollX = new Animated.Value(0)
  const flatListRef = useRef(null)

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index)
    }
  }

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // At least 50% of the item must be visible
  }

  useEffect(() => {
    if (auto) {
      const interval = setInterval(() => {
        let nextIndex = activeIndex + direction

        if (nextIndex >= images.length) {
          nextIndex = images.length - 2 // Go to the second-last image
          setDirection(-1) // Reverse direction
        } else if (nextIndex < 0) {
          nextIndex = 1 // Go to the second image
          setDirection(1) // Move forward
        }

        flatListRef.current.scrollToOffset({
          offset: nextIndex * width,
          animated: true,
        })
        setActiveIndex(nextIndex)
      }, 5000) // Change slide every 10 seconds

      return () => clearInterval(interval) // Clear interval on component unmount
    }
  }, [auto, activeIndex, direction, images.length, width])

  return (
    <>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={({ item }) => (
          <View style={{ width: width, paddingHorizontal: paddingHor }}>
            <View
              style={{ height: vs(190) }}
              className="w-full  rounded-[15px] overflow-hidden"
            >
              <Image
                placeholder={{ blurhash }}
                className="w-full h-full"
                source={{ uri: item.uri || item }}
              />
            </View>
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: mvs(10),
        }}
      >
        {images.length > 1 &&
          images.map((_, index) => (
            <View
              key={index}
              className="rounded-full w-[5px] h-[5px] mx-[3px]"
              style={{
                backgroundColor:
                  index === activeIndex ? colors.primary : colors.disabbled,
              }}
            />
          ))}
      </View>
    </>
  )
}

export default ImageSlider
