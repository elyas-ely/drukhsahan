import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from '@components/shared/Icon';
import { useTheme } from '@contexts/ThemeContext';
import { router } from 'expo-router';

export default function BageIcon({ iconName, otherStyles, stroke }) {
  const { colors } = useTheme();
  const pushdirectory =
    iconName === 'Bag'
      ? '(screens)/cartScreen'
      : '(screens)/notificationsScreen';

  bageNumber = iconName === 'Bag' ? 2 : 3;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.push(pushdirectory)}
      className={`${otherStyles}`}
    >
      {/* icon */}
      {iconName && (
        <Icon
          name={iconName}
          width={26}
          height={26}
          strokeWidth={2}
          stroke={stroke}
        />
      )}

      {/* Bage */}

      <View
        style={{ backgroundColor: colors.primary }}
        className="w-[17px] h-[17px] rounded-full  items-center  absolute -top-[3px] -left-[3px]"
      >
        {/* Bage Text */}

        <Text
          style={{ color: colors.buttonText }}
          className="wregular text-[12px] text-center"
        >
          {bageNumber}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
