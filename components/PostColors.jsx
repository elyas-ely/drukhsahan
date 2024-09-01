import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { act, useState } from 'react';
import { carColors } from '@constants/data.json';
import { useTheme } from '@contexts/ThemeContext';
import { ms } from 'react-native-size-matters';
import { paddingHor } from '@functions';

export default function PostColors({ onSelect, selectedColor, error }) {
  const { colors } = useTheme();

  const selectColor = (value) => {
    onSelect(value);
  };
  return (
    <>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: paddingHor,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {carColors.map((item, index) => {
          const active = item.name === selectedColor;
          return (
            <TouchableWithoutFeedback
              onPress={() => selectColor(item.name)}
              key={index}
            >
              <View
                style={{
                  borderWidth: 2.5,
                  borderColor: active ? colors.primary : colors.background,
                }}
                className="mr-[15px] p-[2px] h-[50] w-[50] rounded-full"
              >
                <View
                  style={{
                    backgroundColor: item.colorCode.toLowerCase(),
                    elevation: 3,
                    shadowColor: colors.shadowColor,
                  }}
                  className="w-[40px] h-[40px] rounded-full  items-center justify-center  "
                ></View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
      {error && (
        <Text
          style={{ color: 'coral', marginHorizontal: paddingHor }}
          className=" text-[12px] mt-[5px] font-rRegular "
        >
          {error}
        </Text>
      )}
    </>
  );
}
