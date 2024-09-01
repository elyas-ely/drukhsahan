import { Link, Redirect } from "expo-router"
import { View } from "react-native"
import * as SplashScreen from "expo-splash-screen"

import { useGlobalContext } from "@contexts/GlobalProvider"
import { useEffect } from "react"

const Welcome = () => {
  const { isLoading, isAuthenticated, user } = useGlobalContext()

  useEffect(() => {
    // Hide splash screen after the app component is mounted
    async function hideSplashScreen() {
      await SplashScreen.hideAsync()
    }
    hideSplashScreen()
  }, [])

  if (isLoading) return null

  if (isAuthenticated && user?.accountId) {
    return <Redirect href="(tabs)/home" />
  } else {
    return <Redirect href="(auth)/sign-in" />
  }
}

export default Welcome
