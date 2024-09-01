import { View, Text, Share } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { useState } from 'react';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { router } from 'expo-router';
import Icon from '@components/shared/Icon';
import Header from '@components/shared/Header';
import MessegeModel from '../../components/shared/MessegeModel';
import CustomeTouchableOpacity from '../../components/shared/CustomTouchableOpacity';
import { mvs } from 'react-native-size-matters';
import { paddingHor } from '@functions';
import { Image } from 'expo-image';
import { blurhash } from '../../utils';

export default function SettingsScreen() {
  const { colors, changeTheme, activeTheme } = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleTheme = () => {
    const newTheme = isEnabled ? 'Light' : 'Dark';
    setIsEnabled(!isEnabled);
    changeTheme(newTheme);
  };

  const [messesgeModelVisible, setMessegeModelVisible] = useState(false);

  const toggleMessegModal = () => setMessegeModelVisible(!messesgeModelVisible);

  const handleShare = async () => {
    try {
      await Share.share({ message: 'Check out this post!' });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const logout = () => {
    toggleMessegModal();
    router.push('(auth)/sign-in');
    console.log('Logged out');
  };

  const menuItems = [
    {
      icon: 'Edit',
      label: 'پروفایل تغیر',
      action: () => router.push('screens/editProfile'),
    },
    {
      icon: 'Lock',
      label: 'شرایط',
      action: () => router.push('screens/privacyPolicy'),
    },
    {
      icon: 'Share',
      label: 'شریکول',
      action: handleShare,
    },
    {
      icon: 'About',
      label: 'زموږ په اړه',
      action: () => router.push('screens/aboutUs'),
    },
    {
      icon: 'Logout',
      label: 'وتل',
      action: toggleMessegModal,
      iconColor: 'coral', // Apply Tailwind color classes
    },
  ];

  return (
    <>
      <ExpoStatusBar style={isEnabled ? 'light' : 'dark'} />
      <MessegeModel
        handleYes={logout}
        messegeModelVisible={messesgeModelVisible}
        toggleMessegeModel={toggleMessegModal}
        logout={true}
      />
      <View
        className="flex-1"
        style={{
          backgroundColor: colors.secondaryBackground,
        }}
      >
        <Header title="تنظیمات" rightIcon="ChevronRight" borderNone={true} />
        <View style={{ paddingTop: mvs(20) }}>
          <View
            style={{ paddingHorizontal: paddingHor }}
            className="flex-row items-center"
          >
            <Image
              placeholder={{ blurhash }}
              className="w-[70px] h-[70px] rounded-full"
              source={require('@assets/images/user.png')}
            />
            <View className="ml-2.5 flex-1">
              <Text
                className="text-[20px] font-rMedium text-left"
                style={{ color: colors.primaryText }}
              >
                افغان موټر سټور
              </Text>
              <Text
                className="text-[14px] font-rRegular mt-[5px] text-left"
                style={{ color: colors.secondaryText }}
              >
                afghanstore@gmail.com
              </Text>
            </View>
            <View className="h-full">
              <CustomeTouchableOpacity marginRight onPress={toggleTheme}>
                <Icon name={activeTheme === 'Light' ? 'Moon' : 'Sun'} />
              </CustomeTouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: mvs(40) }}>
            {menuItems.map((item, index) => (
              <CustomeTouchableOpacity
                key={index}
                dropDown
                onPress={item.action}
                otherStyles={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 0,
                  paddingHorizontal: paddingHor,
                  alignItem: 'center',
                }}
              >
                <View
                  style={{
                    paddingVertical: mvs(20),
                    borderBottomWidth: index === 4 ? 0 : 1,
                    borderColor: colors.borderColor,
                  }}
                  className=" flex-1 flex-row justify-between items-center"
                >
                  <View className="flex-row items-center ">
                    <Icon
                      width={24}
                      height={24}
                      name={item.icon}
                      stroke={item.iconColor || undefined}
                      fill={item.iconColor || undefined}
                    />
                    <Text
                      className="text-[18px] font-rRegular mx-2.5"
                      style={{ color: item.iconColor || colors.primaryText }}
                    >
                      {item.label}
                    </Text>
                  </View>
                  {item.label !== 'وتون' && (
                    <Icon
                      width={20}
                      height={20}
                      name="ChevronLeft"
                      strokeWidth={2.5}
                    />
                  )}
                </View>
              </CustomeTouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </>
  );
}
