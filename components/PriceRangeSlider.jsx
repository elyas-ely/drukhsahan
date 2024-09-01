import { StyleSheet, View, TextInput, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useTheme } from '@contexts/ThemeContext';
import CustomInput from './shared/CustomInput';
import { ms, mvs } from 'react-native-size-matters';
import { paddingHor } from '@functions';

const PriceRangeSlider = ({
  sliderWidth,
  min,
  max,
  maxPrice,
  minPrice,
  step,
  onValueChange,
  resetTrigger,
}) => {
  const [inputMinPrice, setInputMinPrice] = useState(minPrice);
  const [inputMaxPrice, setInputMaxPrice] = useState(maxPrice);
  const { colors } = useTheme();

  // Initial positions based on initial minPrice and maxPrice
  useEffect(() => {
    // Reset the internal state when the form is reset
    setInputMinPrice(minPrice);
    setInputMaxPrice(maxPrice);

    // Update the slider positions
    position.value = ((maxPrice - min) / (max - min)) * sliderWidth;
    position2.value = ((minPrice - min) / (max - min)) * sliderWidth;
  }, [resetTrigger]); // Dependency array with resetTrigger, minPrice, maxPrice

  // The rest of your PriceRangeSlider code remains the same

  const position = useSharedValue(
    ((maxPrice - min) / (max - min)) * sliderWidth
  );
  const position2 = useSharedValue(
    ((minPrice - min) / (max - min)) * sliderWidth
  );

  const opacity = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const zIndex = useSharedValue(0);
  const zIndex2 = useSharedValue(0);
  const context = useSharedValue(0);
  const context2 = useSharedValue(0);

  const handleMinPrice = () => {
    const clampedMin = Math.max(min, Math.min(inputMinPrice, inputMaxPrice));
    setInputMinPrice(clampedMin);
    const minPos = ((clampedMin - min) / (max - min)) * sliderWidth;
    position2.value = minPos;
    onValueChange({ min: clampedMin, max: inputMaxPrice });
  };

  const handleMaxPrice = () => {
    const clampedMax = Math.max(inputMinPrice, Math.min(inputMaxPrice, max));
    setInputMaxPrice(clampedMax);
    const maxPos = ((clampedMax - min) / (max - min)) * sliderWidth;
    position.value = maxPos;
    onValueChange({ min: inputMinPrice, max: clampedMax });
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      context.value = position.value;
    })
    .onUpdate((e) => {
      opacity.value = 1;
      if (context.value - e.translationX < position2.value) {
        // Ensures min slider doesn't overlap max slider
        position.value = position2.value;
        zIndex.value = 1;
        zIndex2.value = 0;
      } else if (context.value - e.translationX > sliderWidth) {
        position.value = sliderWidth;
      } else {
        position.value = context.value - e.translationX;
      }
    })
    .onEnd(() => {
      opacity.value = 0;
      const newMaxPrice =
        min +
        Math.floor(position.value / (sliderWidth / ((max - min) / step))) *
          step;
      runOnJS(setInputMaxPrice)(newMaxPrice);
      runOnJS(onValueChange)({
        min: inputMinPrice,
        max: newMaxPrice,
      });
    });

  const pan2 = Gesture.Pan()
    .onBegin(() => {
      context2.value = position2.value;
    })
    .onUpdate((e) => {
      opacity2.value = 1;
      if (context2.value - e.translationX < 0) {
        // Ensures max slider doesn't overlap min slider
        position2.value = 0;
      } else if (context2.value - e.translationX > position.value) {
        position2.value = position.value;
        zIndex.value = 0;
        zIndex2.value = 1;
      } else {
        position2.value = context2.value - e.translationX;
      }
    })
    .onEnd(() => {
      opacity2.value = 0;
      const newMinPrice =
        min +
        Math.floor(position2.value / (sliderWidth / ((max - min) / step))) *
          step;
      runOnJS(setInputMinPrice)(newMinPrice);
      runOnJS(onValueChange)({
        min: newMinPrice,
        max: inputMaxPrice,
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -position.value }], // Reversed logic for RTL
    zIndex: zIndex.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateX: -position2.value }], // Reversed logic for RTL
    zIndex: zIndex2.value,
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const opacityStyle2 = useAnimatedStyle(() => ({
    opacity: opacity2.value,
  }));

  const sliderStyle = useAnimatedStyle(() => ({
    right: sliderWidth - position.value, // Start at the max position
    width: position.value - position2.value, // The width between the max and min
  }));

  Animated.addWhitelistedNativeProps({ text: true });
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  const minLabelText = useAnimatedProps(() => {
    return {
      text: `$${
        min +
        Math.floor(position2.value / (sliderWidth / ((max - min) / step))) *
          step
      }`,
    };
  });

  const maxLabelText = useAnimatedProps(() => {
    return {
      text: `$${
        min +
        Math.floor(position.value / (sliderWidth / ((max - min) / step))) * step
      }`,
    };
  });

  return (
    <View
      style={{ paddingHorizontal: paddingHor }}
      className=" justify-center items-center "
    >
      <View style={{ marginBottom: mvs(30) }} className="flex-row ">
        <CustomInput
          icon={'FilledCoin'}
          value={inputMinPrice.toString()}
          handleChangeText={(v) => setInputMinPrice(Number(v))}
          numericType={true}
          otherStyles={'flex-1'}
          onSubmit={handleMinPrice}
        />
        <CustomInput
          icon={'FilledCoin'}
          value={inputMaxPrice.toString()}
          handleChangeText={(v) => setInputMaxPrice(Number(v))}
          numericType={true}
          otherStyles={'flex-1 ml-[15px]'}
          onSubmit={handleMaxPrice}
        />
      </View>
      <View style={{ width: sliderWidth }} className="justify-center  z-10">
        <View
          style={{
            width: sliderWidth,
            backgroundColor: colors.lightPrimary,
            height: 5,
          }}
          className="rounded-full  "
        />
        <Animated.View
          style={[
            sliderStyle,
            styles.sliderFront,
            { backgroundColor: colors.primary },
          ]}
        />
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              animatedStyle,
              styles.thumb,
              {
                backgroundColor: colors.primary,
                borderColor: colors.darkPrimary,
              },
            ]}
          >
            <Animated.View
              style={[
                opacityStyle,
                styles.label,
                { backgroundColor: colors.primary },
              ]}
            >
              <AnimatedTextInput
                style={styles.labelText}
                animatedProps={maxLabelText}
                editable={false}
                defaultValue={`$${
                  min +
                  Math.floor(
                    (sliderWidth - position.value) /
                      (sliderWidth / ((max - min) / step))
                  ) *
                    step
                }`}
              />
              <View
                style={{ backgroundColor: colors.primary }}
                className="w-2 h-2 absolute -bottom-0.5 rotate-45"
              ></View>
            </Animated.View>
          </Animated.View>
        </GestureDetector>
        <GestureDetector gesture={pan2}>
          <Animated.View
            style={[
              animatedStyle2,
              styles.thumb,
              {
                backgroundColor: colors.primary,
                borderColor: colors.darkPrimary,
              },
            ]}
          >
            <Animated.View
              style={[
                opacityStyle2,
                styles.label,
                { backgroundColor: colors.primary },
              ]}
            >
              <AnimatedTextInput
                style={styles.labelText}
                animatedProps={minLabelText}
                editable={false}
                defaultValue={`$${
                  min +
                  Math.floor(
                    (sliderWidth - position2.value) /
                      (sliderWidth / ((max - min) / step))
                  ) *
                    step
                }`}
              />
              <View
                style={{ backgroundColor: colors.primary }}
                className="w-2 h-2 absolute -bottom-0.5 rotate-45"
              ></View>
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
};

export default PriceRangeSlider;

const styles = StyleSheet.create({
  sliderFront: {
    height: 5,
    borderRadius: 20,
    position: 'absolute',
    right: 0,
  },
  thumb: {
    left: -10,
    width: 25,
    height: 25,
    borderWidth: 3,
    position: 'absolute',
    borderRadius: 50,
  },
  label: {
    position: 'absolute',
    top: -45,
    bottom: 30,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    color: 'white',
    padding: 5,
    fontSize: 16,
    width: '100%',
  },
});
