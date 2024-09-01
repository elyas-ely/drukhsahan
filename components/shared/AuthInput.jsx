import { View, TextInput, TouchableOpacity, Text } from "react-native"
import React, { useState } from "react"
import Icon from "./Icon"
import * as Icona from "react-native-feather"
import { useTheme } from "@contexts/ThemeContext"

export default function AuthInput({
  iconName,
  placeHolder,
  keyboardType,
  value,
  handleChangeText,
  otherStyles,
  error,
}) {
  const { colors } = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  const isPasswordField =
    placeHolder === "پاسورډ" || placeHolder === "Confirm Password"

  const EyeIcon = showPassword ? Icona.EyeOff : Icona.Eye

  return (
    <>
      <View className={`flex-row items-center  w-full ${otherStyles}`}>
        <View className="mr-[15px]">
          {Icon && (
            <Icon
              name={iconName}
              strokeWidth={1.5}
              stroke={colors.placeHolderText}
              fill={colors.placeHolderText}
              width={28}
              height={28}
            />
          )}
        </View>
        <View
          style={{
            borderColor: isFocused ? colors.primary : colors.borderColor,
          }}
          className={`border-b flex-row flex-1 items-center`}
        >
          <TextInput
            placeholder={placeHolder}
            keyboardType={keyboardType}
            placeholderTextColor={colors.placeHolderText}
            style={{ color: colors.primaryText }}
            className="pb-[10px] px-2.5 font-rRgular flex-1 text-[18px]"
            value={value}
            onChangeText={handleChangeText}
            secureTextEntry={isPasswordField && !showPassword}
            onFocus={() => setIsFocused(true)} // Set focus to true
            onBlur={() => setIsFocused(false)} // Set focus to false
          />
          {isPasswordField && value !== "" && (
            <TouchableOpacity onPress={handleShowPassword}>
              <EyeIcon
                width={20}
                height={20}
                strokeWidth={1.5}
                stroke={colors.placeHolderText}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {error && (
        <Text
          style={{ color: "coral" }}
          className=" text-[12px] mt-[5px] font-rRegular "
        >
          {error}
        </Text>
      )}
    </>
  )
}
