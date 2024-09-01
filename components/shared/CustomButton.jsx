import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from '@contexts/ThemeContext';
import { ms, mvs } from 'react-native-size-matters';

export default function CustomButton({
  title,
  handlePress,
  otherStyles,
  headerButton,
  warningText,
  warning,
  simple,
}) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={{
        paddingHorizontal: headerButton ? 20 : ms(20),
        paddingVertical: headerButton ? 10 : mvs(10),
        borderColor: colors.borderColor,
        backgroundColor: warning
          ? 'coral'
          : simple
          ? colors.secondaryBackground
          : colors.primary,
      }}
      className={`
        ${simple && 'border'}
        ${headerButton ? 'rounded-full' : 'rounded-[10px]'} 

        
        flex-row items-center justify-center ${otherStyles}`}
    >
      <Text
        style={{
          color: simple ? colors.primaryText : colors.buttonText,
        }}
        className={`
          font-rBlack
        ${
          headerButton
            ? 'text-[15px] font-rBold'
            : `${
                warningText
                  ? ' font-rBold text-[16px]'
                  : 'font-rBold text-[18px]'
              }`
        }
            
            `}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
