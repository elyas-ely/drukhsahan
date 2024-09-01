import { I18nManager } from "react-native"
import React, { useEffect } from "react"
import { ThemeProvider } from "@contexts/ThemeContext"
import { SplashScreen, Stack, router } from "expo-router"
import { useFonts } from "expo-font"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { NotificationProvider } from "@contexts/NotificationContext"
import { LoadingProvider } from "@contexts/LoadingContext"
import * as Updates from "expo-updates"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import GlobalProvider from "@contexts/GlobalProvider"

SplashScreen.preventAutoHideAsync()
const queryClient = new QueryClient()

export default function StackLayout() {
  const [fontsLoaded, error] = useFonts({
    "Alexandria-Light": require("../assets/fonts/alexadaria/Alexandria-Light.ttf"),
    "Alexandria-Regular": require("../assets/fonts/alexadaria/Alexandria-Regular.ttf"),
    "Alexandria-Medium": require("../assets/fonts/alexadaria/Alexandria-Medium.ttf"),
    "Alexandria-Bold": require("../assets/fonts/alexadaria/Alexandria-Bold.ttf"),
    "Alexandria-SemiBold": require("../assets/fonts/alexadaria/Alexandria-SemiBold.ttf"),
    "Alexandria-Black": require("../assets/fonts/alexadaria/Alexandria-Black.ttf"),
    "Roboto-Light": require("../assets/fonts/roboto/Roboto-Light.ttf"),
    "Roboto-Regular": require("../assets/fonts/roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../assets/fonts/roboto/Roboto-Bold.ttf"),
    "Roboto-Black": require("../assets/fonts/roboto/Roboto-Black.ttf"),
  })

  useEffect(() => {
    const initializeApp = async () => {
      if (!I18nManager.isRTL) {
        I18nManager.forceRTL(true)
        await Updates.reloadAsync() // Reload to apply RTL settings
      } else if (fontsLoaded) {
        SplashScreen.hideAsync()
      }
    }

    if (error) throw error
    if (fontsLoaded) initializeApp()
  }, [fontsLoaded, error])

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <ThemeProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <LoadingProvider>
              <NotificationProvider>
                <Stack
                  screenOptions={{
                    headerShown: false,
                    animation: "slide_from_left",
                  }}
                  initialRouteName="(tabs)"
                >
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="(auth)" />
                  <Stack.Screen name="index" />
                  <Stack.Screen name="screens" />
                </Stack>
              </NotificationProvider>
            </LoadingProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </GlobalProvider>
    </QueryClientProvider>
  )
}
