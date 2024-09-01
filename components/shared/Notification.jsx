import React, { useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '@contexts/ThemeContext';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { ms, mvs } from 'react-native-size-matters';
import { paddingHor } from '@functions';

const notificationConfig = {
  Success: {
    title: 'بریالیتوب سره',
    bgColor: '#1dbf73', // success color
    duration: 2000, // duration in milliseconds
  },
  Warning: {
    title: 'خبرتیا',
    bgColor: 'rgb(234, 179, 8)', // warning color
    duration: 2000,
  },
  Error: {
    title: 'ستونزه',
    bgColor: 'rgb(239, 68, 68)', // error color
    duration: 2000,
  },
  Info: {
    title: 'Info',
    bgColor: '#5BB7DE', // info color
    duration: 2000,
  },
};

const Notification = ({ type, message, onDismiss }) => {
  const { colors } = useTheme();
  const { title, bgColor, duration } = notificationConfig[type];

  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);
  const progress = useSharedValue(100);

  useEffect(() => {
    // Show animation
    translateY.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    });
    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    });

    // Progress bar animation
    progress.value = withTiming(0, {
      duration,
      easing: Easing.linear,
    });

    // Hide animation after timeout
    const hideTimeout = setTimeout(() => {
      triggerHideAnimation();
    }, duration);

    return () => clearTimeout(hideTimeout);
  }, []);

  const triggerHideAnimation = () => {
    translateY.value = withTiming(-100, {
      duration: 500,
      easing: Easing.in(Easing.cubic),
    });
    opacity.value = withTiming(0, {
      duration: 500,
      easing: Easing.in(Easing.cubic),
    });
    setTimeout(onDismiss, 300);
  };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const animatedProgressBarStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  const handleGesture = (event) => {
    if (event.translationY < -10) {
      runOnJS(triggerHideAnimation)();
    }
  };

  return (
    <PanGestureHandler onGestureEvent={(e) => handleGesture(e.nativeEvent)}>
      <Animated.View
        className="absolute left-5 right-5 rounded-md z-40 "
        style={[
          animatedContainerStyle,
          {
            marginTop: StatusBar.currentHeight + 5,
            top: mvs(20),
            left: paddingHor,
            right: paddingHor,
          },
        ]}
      >
        <View
          className="pt-2.5 pb-5 px-5 rounded-md border"
          style={{
            backgroundColor: colors.secondaryBackground,
            borderColor: colors.borderColor,
          }}
        >
          <Text style={{ color: bgColor }} className="text-[18px] font-rBold">
            {title}
          </Text>

          <Text
            style={{ color: colors.secondaryText }}
            className="text-[16px] font-rRegular mt-[5px]"
          >
            {message}
          </Text>
          <Animated.View
            className="h-1 rounded-full absolute bottom-0 right-0"
            style={[animatedProgressBarStyle, { backgroundColor: bgColor }]}
          />
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Notification;
