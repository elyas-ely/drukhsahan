import { View, Text, FlatList } from "react-native"
import React, { useEffect, useState } from "react"
import Section from "./shared/Section"
import PopularChoicesCard from "./PopularChoicesCard"
import { cars } from "@constants/data.json"
import { s, vs, ms, mvs } from "react-native-size-matters"
import { paddingHor } from "@functions"
import { useGetPapularPosts } from "../lib/tan-stack/posts/postQueries"

export default function PopularChoicesSection() {
  const { data: posts, refetch } = useGetPapularPosts()

  return (
    <Section
      title="بهترېن انتخابونه"
      seeAll={true}
      big={true}
      // carIds={selectedCarids}
      otherStyles={{ marginTop: mvs(10) }}
    >
      <FlatList
        data={posts} // Array of posts to render
        keyExtractor={(post) => post?.$id} // Unique key for each item
        renderItem={({ item }) => <PopularChoicesCard post={item} />}
        contentContainerStyle={{ paddingHorizontal: paddingHor }}
        ItemSeparatorComponent={() => (
          <View style={{ width: mvs(15) }} className=" opacity-0"></View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Section>
  )
}
