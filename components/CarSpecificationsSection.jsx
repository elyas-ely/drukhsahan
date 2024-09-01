import { FlatList, Text, View } from "react-native"
import { useTheme } from "@contexts/ThemeContext"
import Icon from "./shared/Icon"
import { ms, vs } from "react-native-size-matters"
import { paddingHor } from "@functions"

export default function CarSpecificationsSection({
  specifications,
  header,
  footer,
}) {
  const { colors } = useTheme()
  const specData = [
    { icon: "Year", value: specifications?.model || "/" },
    { icon: "Transmission", value: specifications?.transmission },
    { icon: "FuelType", value: specifications?.fuelType },
    { icon: "Speed", value: specifications?.speed || "/" },
    { icon: "Engine", value: specifications?.engine || "/" },
    { icon: "Side", value: specifications?.drive || "/" },
  ]

  return (
    <View className="">
      <FlatList
        ListHeaderComponent={header}
        ListFooterComponent={footer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        data={specData}
        renderItem={({ item }) => (
          <View
            className={` flex-1 rounded-[10px] items-center `}
            style={{
              // borderColor: colors.borderColor,
              backgroundColor: colors.secondaryBackground,
              elevation: 2,
              shadowColor: colors.shadowColor,
              paddingVertical: vs(10),
            }}
          >
            <Icon
              name={item.icon}
              stroke={colors.primary}
              fill={colors.primary}
            />
            <Text
              className="text-[16px] font-rRegular mt-[8px]"
              style={{ color: colors.primaryText }}
            >
              {item.value}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: ms(15) }} />}
        numColumns={3}
        columnWrapperStyle={{
          gap: ms(15),
          paddingHorizontal: paddingHor,
        }}
        keyExtractor={(item) => item.icon}
      />
    </View>
  )
}
