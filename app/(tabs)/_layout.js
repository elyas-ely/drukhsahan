import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import Icon from '@components/shared/Icon';
import { useTheme } from '@contexts/ThemeContext';

export default function TabsLayout() {
  const { colors } = useTheme();
  const router = useRouter();
  const activeStyles =
    'px-[15px] py-[5px] rounded-full items-center justify-center';

  const iconMapping = {
    home: 'Home',
    notifications: 'Notification',
    createPost: 'Plus',
    favorite: 'BookMark',
    profile: 'Profile',
  };

  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: colors.secondaryBackground,
            height: 55,
            paddingHorizontal: 10,
            borderColor: colors.borderColor,
          },
          tabBarIcon: ({ focused }) => {
            const iconName = iconMapping[route.name];
            return route.name !== 'createPost' ? (
              <View
                className={` ${focused ? activeStyles : ''}`}
                style={{
                  backgroundColor: focused && colors.lightPrimaryColor,
                  color: focused && colors.primary,
                }}
              >
                {iconName === 'Notification' ? (
                  <View>
                    <View
                      style={{
                        backgroundColor: colors.secondaryBackground,
                        padding: 2,
                        left: 3,
                      }}
                      className="  absolute top-0.5 left-0.5  rounded-full z-10"
                    >
                      <View
                        style={{ backgroundColor: colors.primary }}
                        className="w-1 h-1  rounded-full "
                      />
                    </View>
                    <Icon
                      fill={focused ? colors.primary : colors.icon}
                      stroke={focused ? colors.primary : colors.icon}
                      strokeWidth={2}
                      name={iconName}
                      size={24}
                    />
                  </View>
                ) : (
                  <Icon
                    fill={focused ? colors.primary : colors.icon}
                    stroke={focused ? colors.primary : colors.icon}
                    strokeWidth={2}
                    name={iconName}
                    size={24}
                  />
                )}
              </View>
            ) : (
              <View
                className="p-1.5 rounded-[10px] border   "
                style={{
                  borderColor: colors.borderColor,
                }}
                onPress={() => router.push('/createPost')} // Use router.push to navigate to createPost screen
              >
                <Icon
                  name="Plus"
                  strokeWidth={2}
                  stroke={focused ? colors.primary : colors.icon}
                />
              </View>
            );
          },
          tabBarLabel: () => null,
        })}
      >
        <Tabs.Screen name="home" />
        {/* <Tabs.Screen name="search" /> */}
        <Tabs.Screen name="favorite" />
        <Tabs.Screen name="createPost" />
        <Tabs.Screen name="notifications" />
        <Tabs.Screen
          name="profile"
          options={{
            statusBarStyle: 'light',
          }}
        />
      </Tabs>
    </>
  );
}
