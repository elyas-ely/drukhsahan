import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import React, { useState } from "react"
import { router } from "expo-router"
import { useTheme } from "@contexts/ThemeContext"
import CustomButton from "@components/shared/CustomButton"
import AuthInput from "@components/shared/AuthInput"
import SocialMedia from "@components/SocialMedia"
import { useNotification } from "@contexts/NotificationContext"
import { useLoading } from "@contexts/LoadingContext"
import { useForm } from "../../Hooks/useForm"
import { ms, mvs, vs } from "react-native-size-matters"
import { paddingHor } from "@functions"
import { signInValidationRules } from "@validations/validationRules"
import { useSignInAccount } from "../../lib/tan-stack/users/userQueries"
import { useGlobalContext } from "@contexts/GlobalProvider"

export default function SignIn() {
  const singInForm = {
    email: "",
    password: "",
  }

  const { colors } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const { showNotification } = useNotification()
  const { showLoading, dismissLoading } = useLoading()
  const { handleErrors, form, errors, handleChange } = useForm(
    singInForm,
    signInValidationRules
  )

  const { checkAuthUser, isLoading: isUserLoading } = useGlobalContext()

  const { mutateAsync: signInAccount, isPending } = useSignInAccount()

  const handleSignin = async () => {
    try {
      const isFormValid = handleErrors()

      if (!isFormValid) {
        showNotification("Warning", "هیله کوو ټول ځایونه په مناسب ډول ډک کړی")
        return
      }

      if (isLoading) {
        showLoading()
      }

      const session = await signInAccount(form)

      if (!session) {
        throw new Error("Sign-in failed. Please try again.")
      }

      const isLoggedIn = await checkAuthUser()

      if (isLoggedIn) {
        console.log("User successfully logged in")
        router.replace("(tabs)/home")
      } else {
        throw new Error("User authentication failed.")
      }
    } catch (error) {
      showNotification(
        "Error",
        error.message || "An unexpected error occurred."
      )
      console.log(error)
    }
  }

  const renderInput = (field, options = {}) => {
    const { placeholder, iconName, keyboaredType } = options

    return (
      <AuthInput
        placeHolder={placeholder}
        value={form[field]}
        handleChangeText={(e) => handleChange(field, e)}
        iconName={iconName}
        keyboaredType={keyboaredType}
        error={errors[field]}
      />
    )
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: colors.secondaryBackground,
      }}
    >
      {/* imageContainer */}

      <View style={{ height: vs(250) }}>
        <Image
          className="w-full h-full"
          source={require("@assets/images/auth.png")}
        />
      </View>

      {/* form container */}

      <View
        style={{ paddingHorizontal: paddingHor, marginTop: mvs(10) }}
        className="items-center  "
      >
        {/* headings */}

        <View className="w-full">
          <Text
            style={{ color: colors.primaryText, marginTop: mvs(20) }}
            className="text-[25px] font-rBold "
          >
            بیرته ښه راغلاست👋
          </Text>
        </View>

        {/* inputs Container */}

        <View style={{ marginTop: mvs(25) }} className="w-full  ">
          {/* Email  */}

          {renderInput("email", {
            placeholder: "ایمیل",
            iconName: "Mail",
            keyboaredType: "email-address",
          })}
          <View style={{ marginTop: mvs(20) }} />
          {renderInput("password", {
            placeholder: "پاسورډ",
            iconName: "Lock",
            keyboaredType: "secure-entry",
          })}
        </View>

        {/* button */}

        <View
          style={{ marginTop: mvs(30), marginBottom: mvs(25) }}
          className="w-full"
        >
          <CustomButton
            title={isLoading ? "داخلیدل..." : "داخلیدل"}
            otherStyles="w-full"
            handlePress={handleSignin}
          />
        </View>

        {/* or line */}

        <View
          style={{ paddingHorizontal: paddingHor }}
          className="w-full items-center justify-center "
        >
          {/* middle line */}

          <View className="absolute top-0  w-full h-full items-center justify-center">
            <View
              style={{ backgroundColor: colors.borderColor }}
              className="w-full h-[1px] "
            ></View>
          </View>

          {/* Text */}

          <Text
            style={{
              backgroundColor: colors.secondaryBackground,
              color: colors.secondaryText,
            }}
            className="text-[18px]  font-rRegular px-[15px]"
          >
            یا
          </Text>
        </View>

        {/* soacial media */}

        <View style={{ marginTop: mvs(15) }} className="w-full ">
          <SocialMedia />
        </View>

        {/* try Register */}

        <TouchableOpacity
          activeOpacity={0.5}
          className=" w-full items-center"
          style={{
            marginTop: mvs(15),
            paddingBottom: mvs(20),
          }}
          onPress={() => router.push("(auth)/sign-up")}
        >
          <Text
            style={{ color: colors.primaryText }}
            className="font-rRegular text-[18px] "
          >
            اکونټ نه لری ؟{" "}
            <Text style={{ color: colors.primary }} className="font-rBold  ">
              ریجسټر
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
