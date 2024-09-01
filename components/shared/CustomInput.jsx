import { View, TextInput, Text } from 'react-native';
import { useState } from 'react';
import { useTheme } from '@contexts/ThemeContext';
import Icon from './Icon';
import { ms, mvs } from 'react-native-size-matters';

export default function CustomInput({
  value,
  handleChangeText,
  onSubmit,
  placeholder,
  icon,
  otherStyles,
  isMultiline,
  multilineHeight = 'h-[160px]',
  link,
  withOutIcon = false,
  numericType,
  border,
  error,
}) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (text) => {
    if (numericType) {
      const numericValue = text.replace(/[^0-9]/g, '');
      handleChangeText(numericValue);
    } else {
      handleChangeText(text);
    }
  };

  return (
    <>
      <View
        style={{
          elevation: 2,
          shadowColor: border ? colors.secondaryBackground : colors.shadowColor,
          backgroundColor: colors.secondaryBackground,
          paddingHorizontal: ms(15),
          borderColor: isFocused
            ? colors.primary
            : border
            ? colors.borderColor
            : undefined,
        }}
        className={` ${(border || isFocused) && 'border'}  rounded-[15px] ${
          !withOutIcon && 'flex-row items-center'
        }  ${otherStyles}`}
      >
        {icon && (
          <Icon
            name={icon}
            fill={colors.placeHolderText}
            stroke={colors.placeHolderText}
          />
        )}
        <TextInput
          placeholder={placeholder}
          value={value}
          onSubmitEditing={onSubmit}
          onChangeText={handleInputChange}
          style={{
            color: link ? '#586EE2' : colors.primaryText,
            textAlignVertical: isMultiline ? 'top' : 'center',
            paddingVertical: isMultiline ? mvs(12) : mvs(10),
          }}
          placeholderTextColor={colors.placeHolderText}
          className={`flex-1 font-rRegular text-[16px]
          ${withOutIcon ? 'pl-0' : 'pl-2.5'}  ${
            link ? 'text-left' : 'text-right'
          } ${isMultiline ? `${multilineHeight}` : undefined}`}
          multiline={isMultiline}
          keyboardType={numericType ? 'numeric' : 'default'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {error && (
        <Text
          style={{ color: 'coral' }}
          className=" text-[12px] mt-[5px] font-rRegular "
        >
          {error}
        </Text>
      )}
    </>
  );
}
