import { View, Text } from "react-native"
import React from "react"
import { Stack } from "expo-router"

export default function ScreensLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_left",
      }}
    >
      <Stack.Screen name="popularChoicesScreen" />
      <Stack.Screen name="postDetails" />
      <Stack.Screen name="searchScreen" />
      <Stack.Screen name="editProfile" />
    </Stack>
  )
}
