import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import React, { useState } from "react"
import { router } from "expo-router"
import { useTheme } from "@contexts/ThemeContext"
import CustomButton from "@components/shared/CustomButton"
import AuthInput from "@components/shared/AuthInput"
import { useNotification } from "@contexts/NotificationContext"
import { useForm } from "../../Hooks/useForm"
import { mvs, vs } from "react-native-size-matters"
import { paddingHor } from "@functions"
import { signUpValidationRules } from "@validations/validationRules"
import { useGlobalContext } from "@contexts/GlobalProvider"
import {
  useCreateUserAccount,
  useSignInAccount,
} from "../../lib/tan-stack/users/userQueries"

export default function SignIn() {
  const signUpForm = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  }

  const { colors } = useTheme()
  const [isLoading, setIsLoading] = useState(false)

  const { showNotification } = useNotification()
  const { handleErrors, form, errors, handleChange } = useForm(
    signUpForm,
    signUpValidationRules
  )
  const { checkAuthUser } = useGlobalContext()

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount()

  const { mutateAsync: signInAccount, isPending: isSigningInUser } =
    useSignInAccount()

  const handleSignup = async () => {
    // console.log(form)

    const isFormValid = handleErrors()

    if (!isFormValid) {
      showNotification("Warning", "هیله کوو ټول ځایونه په مناسا ډول ډک کړی")
      return
    }

    if (form.password !== form.passwordConfirmation) {
      showNotification("Warning", "Passwords do not match")
      return
    }

    try {
      const newUser = await createUserAccount(form)

      if (!newUser) {
        showNotification("Error", "Sign-up failed. Please try again.")
        return
      }

      const session = await signInAccount(form)

      if (!session) {
        showNotification(
          "Error",
          "Sign-in failed. Please login to your new account."
        )
        return
      }

      const isLoggedIn = await checkAuthUser()

      if (isLoggedIn) {
        console.log("User successfully logged in")
        router.replace("(tabs)/home")
      } else {
        showNotification("Error", "Login failed. Please try again.")
      }
    } catch (error) {
      showNotification(
        "Error",
        error.message || "An unexpected error occurred."
      )
      console.error("Error during sign-up or sign-in:", error)
    }
  }

  // const handleFormSubmit = () => {
  //   const isFormValid = handleErrors();
  //   if (!isFormValid) {
  //     showNotification('Warning', 'هیله کوو ټول  ځایونه په مناسا ډول ډک کړی');
  //     return;
  //   }

  //   // Submit the form if valid
  //   showNotification('Success', 'تاسو داخیل سولاست');
  //   console.log(form);
  // };

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
      <View style={{ height: vs(232) }}>
        <Image
          className="w-full h-full"
          source={require("@assets/images/auth.png")}
        />
      </View>
      {/* form container */}
      <View
        style={{ paddingHorizontal: paddingHor, marginTop: mvs(10) }}
        className="items-center"
      >
        <View className="w-full">
          <Text
            style={{ color: colors.primaryText, marginTop: mvs(20) }}
            className="text-[25px] font-rBold "
          >
            اکونت رجیستر
          </Text>
        </View>
        {/* inputs Container */}
        <View className="w-full mt-[25px]  ">
          {/* Email  */}

          {renderInput("name", {
            placeholder: "نوم",
            iconName: "User",
          })}
          <View style={{ marginTop: mvs(20) }} />

          {renderInput("email", {
            placeholder: "ایمیل",
            iconName: "Mail",
            keyboaredType: "email-address",
          })}
          <View style={{ marginTop: mvs(20) }} />

          {renderInput("password", {
            placeholder: "پاسورډ",
            iconName: "Lock",
          })}
          <View style={{ marginTop: mvs(20) }} />

          {renderInput("passwordConfirmation", {
            placeholder: "پاسورډ تکرار",
            iconName: "Lock",
          })}
        </View>

        {/* button */}

        <View style={{ marginTop: mvs(30) }} className="w-full">
          <CustomButton
            title={isLoading ? "داخلیدل..." : "داخلیدل"}
            otherStyles="w-full"
            handlePress={handleSignup}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          className=" w-full items-center"
          style={{
            marginTop: mvs(15),

            paddingBottom: mvs(20),
          }}
          onPress={() => router.push("(auth)/sign-in")}
        >
          <Text
            style={{ color: colors.primaryText }}
            className="font-rRegular text-[18px] "
          >
            اکونټ لری ؟{" "}
            <Text style={{ color: colors.primary }} className="font-rBold  ">
              لوګین
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
