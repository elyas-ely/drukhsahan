import { View, Text, Switch, TouchableOpacity, Share } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import Icon from './shared/Icon';
import { useState } from 'react';
import { router } from 'expo-router';

export default function SecondaryMenu() {
  const { colors, activeTheme, changeTheme } = useTheme();
  const [statusBarStyle, setStatusBarStyle] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const [isSwitchDisabled, setIsSwitchDisabled] = useState(false);

  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    setIsSwitchDisabled(true);
    changeTheme(newValue ? 'Dark' : 'Light'); // Change theme based on new value
    setStatusBarStyle(!statusBarStyle);
    setIsSwitchDisabled(false);
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: 'Check out this post!' });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  return (
    <View
      style={{
        backgroundColor: colors.secondaryBackground,
        borderColor: colors.borderColor,
      }}
      className=" rounded-[15px] w-[130px] border absolute top-8 right-0  px-3  z-50 "
    >
      <View
        style={{
          borderColor: colors.borderColor,
          backgroundColor: colors.secondaryBackground,
        }}
        className="w-3 h-3   rotate-45 absolute -top-1.5 right-[14px]  border"
      ></View>
      {/* <View className="w-4 h-2.5    absolute -top-[0.5px] right-[8px]   "></View> */}
      <TouchableOpacity
        onPress={() => router.push('screens/editProfile')}
        style={{
          borderColor: colors.borderColor,
          backgroundColor: colors.secondaryBackground,
        }}
        className="flex-row items-center justify-center px-5 py-2.5 border-b "
      >
        <Icon name="Edit" width={20} height={20} fill={colors.secondaryText} />
        <Text
          style={{ color: colors.primaryText }}
          className="text-[16px] font-rBold ml-2.5"
        >
          تغیرول
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleShare}
        style={{ borderColor: colors.borderColor }}
        className="flex-row items-center justify-center  px-5 py-2.5 border-b  "
      >
        <Icon name="Share" width={20} height={20} fill={colors.secondaryText} />
        <Text
          style={{ color: colors.primaryText }}
          className="text-[16px] font-rBold ml-2.5"
        >
          شریکول
        </Text>
      </TouchableOpacity>
      <View
        style={{ borderColor: colors.borderColor }}
        className="flex-row items-center justify-center px-5  "
      >
        <View className="mr-2.5">
          <Icon
            name={activeTheme === 'Light' ? 'Sun' : 'Moon'}
            width={20}
            height={20}
            stroke={colors.secondaryText}
          />
        </View>
      </View>
    </View>
  );
}
