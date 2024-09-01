import { View, FlatList, ActivityIndicator } from "react-native"
import Header from "@components/shared/Header"
import { useTheme } from "@contexts/ThemeContext"
import { useEffect, useState } from "react"
import { cars } from "@constants/data.json"
import RowCard from "@components/shared/RowCard"
import { ms, mvs } from "react-native-size-matters"
import { paddingHor } from "@functions"
import { useGlobalContext } from "@contexts/GlobalProvider"
import { useGetSavedPosts } from "../../lib/tan-stack/posts/postQueries"

export default function Favorite() {
  const { colors } = useTheme()
  const { user } = useGlobalContext()
  const { data, isPending, isError, error } = useGetSavedPosts(user?.$id || "")

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <Header secondaryLogo={true} title="خوښي وړ" />
      {isPending ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(post) => post?.$id}
          contentContainerStyle={{
            paddingHorizontal: paddingHor,
            paddingVertical: mvs(20),
          }}
          ItemSeparatorComponent={() => (
            <View style={{ height: mvs(15) }}></View>
          )}
          renderItem={({ item }) => (
            <RowCard isFavorite={true} post={item.post} />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}
