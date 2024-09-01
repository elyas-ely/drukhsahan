import { Pressable, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { useTheme } from '@contexts/ThemeContext';

const CustomeTouchableOpacity = ({
  children,
  onPress,
  marginRight,
  marginLeft,
  marginTop,
  otherStyles,
  dropDown,
}) => {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const { colors } = useTheme();
  const rippleScale = useSharedValue(0);
  const rippleOpacity = useSharedValue(0);
  const rippleX = useSharedValue(0);
  const rippleY = useSharedValue(0);

  const handlePressIn = (event) => {
    const { locationX, locationY } = event.nativeEvent;

    rippleX.value = locationX;
    rippleY.value = locationY;

    // Reset ripple effect
    rippleScale.value = 0;
    rippleOpacity.value = 0.3;

    rippleScale.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.ease),
    });

    rippleOpacity.value = withDelay(
      400,
      withTiming(0, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      })
    );
  };

  const rippleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: rippleX.value - dropDown ? 50 : 15 }, // Center ripple at touch point
      { translateY: rippleY.value - dropDown ? 50 : 15 }, // Center ripple at touch point
      { scale: rippleScale.value * (SCREEN_WIDTH / dropDown ? 100 : 50) },
    ],
    opacity: rippleOpacity.value,
  }));

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPress={onPress}
      className={` overflow-hidden items-center justify-center  ${
        dropDown ? 'rounded-[10px]' : 'rounded-full '
      }   ${marginRight && '-mr-[7px]'} ${marginLeft && '-ml-[14px]'} ${
        marginTop && '-mt-[7px]'
      }  `}
      style={[{ padding: 7 }, otherStyles]}
    >
      <Animated.View
        style={[
          rippleStyle,
          {
            position: 'absolute',
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: colors.selectedBackground,
          },
        ]}
      />
      {children}
    </Pressable>
  );
};

export default CustomeTouchableOpacity;
