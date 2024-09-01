import { View, Text, FlatList, ActivityIndicator } from "react-native"
import Header from "@components/shared/Header"
import { useTheme } from "@contexts/ThemeContext"
import RowCard from "@components/shared/RowCard"
import { ms, mvs } from "react-native-size-matters"
import { paddingHor } from "@functions"
import { useGetPapularPosts } from "../../lib/tan-stack/posts/postQueries"

export default function PopularChoicesScreen() {
  const { colors } = useTheme()

  const { data: posts, refetch, isPending } = useGetPapularPosts()

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <Header
        secondaryLogo={true}
        title="بهترېن انتخابونه"
        rightIcon="ChevronRight"
      />
      {isPending ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(post) => post?.$id}
          contentContainerStyle={{
            paddingHorizontal: paddingHor,
            paddingVertical: mvs(20),
          }}
          ItemSeparatorComponent={() => (
            <View style={{ height: mvs(15) }}></View>
          )}
          renderItem={({ item }) => <RowCard post={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}
