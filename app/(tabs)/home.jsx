import { View, FlatList, BackHandler, Alert, Text } from "react-native"
import React, { useState, useEffect, useCallback } from "react"
import { useFocusEffect } from "expo-router"
import Header from "@components/shared/Header"
import Banner from "@components/Banner"
import Section from "@components/shared/Section"
import PostCard from "@components/shared/PostCard"
import { cars } from "@constants/data.json"
import PopularChoicesSection from "../../components/PopularChoicesSection"
import { useTheme } from "@contexts/ThemeContext"
import SearchModel from "../../components/shared/SearchModel"
import { mvs } from "react-native-size-matters"
import { useGlobalContext } from "@contexts/GlobalProvider"
import { useGetRecentPosts } from "../../lib/tan-stack/posts/postQueries"

export default function Home() {
  const { colors } = useTheme()
  const [modalVisible, setModalVisible] = useState(false)

  const toggleModel = () => {
    setModalVisible(!modalVisible)
  }

  const { data: posts, isPending, isError, refetch } = useGetRecentPosts()
  const { user } = useGlobalContext()
  // console.log(user)

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert(
          "د افلیکیشن څخه وتون",
          "تاسو غواړی چی د افلیکیشن څخه ووځی?",
          [
            {
              text: "نه",
              onPress: () => null,
              style: "cancel",
            },
            { text: "بلی", onPress: () => BackHandler.exitApp() },
          ]
        )
        return true
      }

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      )

      // Cleanup the event listener on unfocus
      return () => backHandler.remove()
    }, [])
  )

  return (
    <View style={{ backgroundColor: colors.background }} className="flex-1">
      <Header toggleModel={toggleModel} logo={true} leftIcon={"Search"} />

      {modalVisible && <SearchModel toggleModel={toggleModel} cars={cars} />}
      <FlatList
        ListHeaderComponent={
          <>
            <Banner />
            <PopularChoicesSection />
            <Section
              title="ځانګړي سوي"
              big={true}
              otherStyles={{ marginTop: mvs(15) }}
            />
          </>
        }
        data={posts}
        keyExtractor={(post) => post?.$id}
        renderItem={({ item }) => <PostCard post={item} />}
        ItemSeparatorComponent={() => (
          <View style={{ height: mvs(15) }} className="h-[15px]"></View>
        )}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
