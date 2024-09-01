import { View, Text, ImageBackground } from "react-native"
import React from "react"
import ImageSlider from "./ImageSlider"
import { s, vs, ms, mvs } from "react-native-size-matters"

export default function Banner() {
  const images = [
    {
      uri: "https://i.pinimg.com/736x/f4/62/d6/f462d6974bc5d34b1590334f46fe31ba.jpg",
    },
    {
      uri: "https://www.motorbiscuit.com/wp-content/uploads/2023/04/Pagani-Huayra-Imola.jpg?w=1024&h=638&strip=all&quality=89",
    },
    {
      uri: "https://media.licdn.com/dms/image/C4E22AQF2sdGvqWFRhg/feedshare-shrink_800/0/1669929753200?e=2147483647&v=beta&t=wY-XNPQhSemq9Gg9iw58puNA6N0S4TsntguWr88NfyY",
    },
  ]
  return (
    // ============== Banner Contaienr ================ //
    <View style={{ marginTop: mvs(20) }}>
      {/* // ============== Image Contaienr ================ // */}

      <ImageSlider images={images} auto={true} />
    </View>
  )
}
