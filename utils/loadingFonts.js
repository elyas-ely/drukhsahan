import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { useEffect, useCallback } from "react"

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync()

export const useCustomFonts = () => {
  const [fontsLoaded, fontError] = useFonts({
    "font-regular": require("../assets/fonts/regular.ttf"),
    "font-bold": require("../assets/fonts/bold.ttf"),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  useEffect(() => {
    if (fontsLoaded || fontError) {
      onLayoutRootView()
    }
  }, [fontsLoaded, fontError])

  return [fontsLoaded, fontError]
}
