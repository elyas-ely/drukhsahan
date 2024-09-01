import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { useTheme } from '@contexts/ThemeContext';
import { router } from 'expo-router';
import Icon from './Icon';
import { ms, mvs } from 'react-native-size-matters';
import { paddingHor } from '@functions';

export default function Section({
  title,
  seeAll,
  children,
  otherStyles,
  carIds,
  big,
  deleteHistory,
}) {
  const { colors } = useTheme();
  const handleNavigate = () => {
    router.push({
      pathname: 'screens/popularChoicesScreen',
      params: { carIds: JSON.stringify(carIds) },
    });
  };
  return (
    <View>
      {/* =========== Section Header ============= */}
      <View
        className={` flex-row justify-between items-center  `}
        style={[
          {
            marginBottom: mvs(15),

            paddingHorizontal: paddingHor,
          },
          otherStyles,
        ]}
      >
        {/* ========= Section Title ========== */}

        <Text
          style={{ color: colors.primaryText }}
          className={`font-rBold  ${big ? 'text-[22px]' : 'text-[20px]'}`}
        >
          {title}
        </Text>

        {/* ========== see all ============== */}
        {seeAll && (
          <TouchableWithoutFeedback onPress={() => handleNavigate()}>
            <Text
              style={{ color: colors.primary }}
              className="font-rBold text-[15px]"
            >
              ټول وګوری
            </Text>
          </TouchableWithoutFeedback>
        )}

        {deleteHistory && (
          <TouchableOpacity>
            <Icon name="Bin" fill={'coral'} />
          </TouchableOpacity>
        )}
      </View>

      {/* ============= children ============ */}
      <View>{children}</View>
    </View>
  );
}
