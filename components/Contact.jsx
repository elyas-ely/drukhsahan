import React, { useState } from "react"
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native"
import { useTheme } from "@contexts/ThemeContext"
import Icon from "./shared/Icon"
import { paddingHor } from "@functions"
import { mvs } from "react-native-size-matters"
import { useGlobalContext } from "@contexts/GlobalProvider"
import {
  makePhoneCall,
  openFacebook,
  OpenWhatsapp,
  openX,
} from "../utils/contactServices"

const TABS = {
  information: "معلومات",
  socailMedia: "تولینزه رسنۍ",
  contact: "تماس",
}

const Contact = ({ allPosts, allLikes }) => {
  const { user } = useGlobalContext()

  const SOCIAL_MEDIA_LINKS = [
    {
      name: "Facebook",
      url: user?.facebook,
      function: () => openFacebook(user?.facebook),
    },
    {
      name: "Whatsapp",
      url: user?.whatsapp,
      function: () => OpenWhatsapp(user?.whatsapp),
    },
    {
      name: "Twitter",
      url: user?.x,
      function: () => openX(user?.x),
    },
  ]

  const STATISTICS = [
    { value: allPosts, label: "پوسټونه" },
    { value: allLikes, label: "لایکونه" },
  ]
  const CONTACT_INFO = [
    {
      icon: "FillPhone",
      text: user?.phoneNumber,
      color: "#586EE2",
      status: true,
      function: () => makePhoneCall(user?.phoneNumber),
    },
    { icon: "FillLocation", text: user?.location, color: null },
  ]
  const [activeTab, setActiveTab] = useState("information")
  const { colors } = useTheme()

  const renderContent = () => {
    switch (activeTab) {
      case "information":
        return (
          <View className="flex-row justify-center pt-5 pb-2.5   items-center">
            {STATISTICS.map((stat, index) => (
              <View key={index} className="items-center  px-10">
                <Text
                  style={{ color: colors.primaryText }}
                  className="font-rMedium text-[30px] "
                >
                  {stat.value}
                </Text>
                <Text
                  style={{ color: colors.secondaryText }}
                  className="font-rRegular text-[16px]"
                >
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        )
      case "socailMedia":
        return SOCIAL_MEDIA_LINKS.map(
          (link, index) =>
            link.url && (
              <TouchableOpacity
                onPress={link.function}
                key={index}
                className="flex-row items-center my-2.5 justify-end"
              >
                <View className="mr-2.5">
                  <Text
                    style={{ color: colors.primary }}
                    className="text-[14px] font-rRegular"
                  >
                    {link.url}
                  </Text>
                </View>
                <Icon name={link.name} />
              </TouchableOpacity>
            )
        )
      case "contact":
        return CONTACT_INFO.map((info, index) => (
          <TouchableOpacity
            disabled={!info.status}
            onPress={info?.function}
            key={index}
            className="flex-row items-center mt-2.5"
          >
            <Icon name={info.icon} fill={colors.secondaryText} />
            <Text
              style={{ color: info.color || colors.primaryText }}
              className="ml-2.5 text-[16px] font-rRegular"
            >
              {info.text}
            </Text>
          </TouchableOpacity>
        ))
    }
  }

  return (
    <View
      className=" my-[15px]  rounded-[15px]"
      style={{
        backgroundColor: colors.secondaryBackground,
        elevation: 10,
        shadowColor: colors.shadowColor,
        paddingHorizontal: paddingHor,
        paddingVertical: mvs(20),
      }}
    >
      <View className="flex-row">
        {Object.entries(TABS).map(([key, label]) => (
          <Pressable
            key={key}
            onPress={() => setActiveTab(key)}
            className={`pb-2 border-b-2 flex-1 items-center justify-center ${
              key === "socailMedia" ? "mx-5" : ""
            }`}
            style={{
              borderColor:
                activeTab === key ? colors.primary : colors.secondaryBackground,
            }}
          >
            <Text
              style={{
                color:
                  activeTab === key ? colors.primary : colors.placeHolderText,
              }}
              className="text-[17px] font-rBold"
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </View>
      <View className="mt-4">{renderContent()}</View>
    </View>
  )
}

export default Contact
