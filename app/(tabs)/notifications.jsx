import { View, Text, FlatList } from 'react-native';
import React from 'react';
import Header from '@components/shared/Header';
import { useTheme } from '@contexts/ThemeContext';
import { notifications } from '@constants/data.json';
import Icon from '@components/shared/Icon';
import { mvs } from 'react-native-size-matters';
import { paddingHor } from '@functions';

export default function Notifications() {
  const { colors } = useTheme();
  const backgrounds = {
    Success: colors.primary,
    Info: '#5BB7DE',
    Warning: '#FFA500',
  };
  return (
    <View style={{ backgroundColor: colors.secondaryBackground, flex: 1 }}>
      <Header secondaryLogo={true} title={'خبرتیاوي'} borderNone={true} />

      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <View
            style={{ paddingHorizontal: paddingHor, paddingVertical: mvs(20) }}
            className="flex-row"
          >
            {/* notification type */}
            <View
              style={{ backgroundColor: backgrounds[item.type] }}
              className="p-[5px] w-[40px] h-[40px] rounded-full items-center justify-center mr-[15px]"
            >
              <Icon name={item?.type} width={24} height={24} fill={'white'} />
            </View>

            {/* notification title and description */}
            <View className="flex-1">
              <Text
                style={{ color: colors.primaryText }}
                className="text-[18px] font-rBold mb-[10px]"
              >
                {item?.title}
              </Text>
              <Text
                style={{ color: colors.secondaryText }}
                className="text-[16px] font-rRegular "
              >
                {item?.description}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
