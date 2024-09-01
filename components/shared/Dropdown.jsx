import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import Icon from './Icon';
import CustomeTouchableOpacity from './CustomTouchableOpacity';
import { ms, mvs } from 'react-native-size-matters';
import { paddingHor } from '@functions';

export default function Dropdown({
  iconName,
  data,
  title,
  otherStyles,
  onSelect,
  value,
  error,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();

  const toggleModel = () => {
    setModalVisible(!modalVisible);
  };

  const selectItem = (item) => {
    onSelect(item);
    toggleModel();
  };

  const displayText = value ? value : title;

  return (
    <>
      <>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            elevation: 2,
            shadowColor: colors.shadowColor,
            paddingHorizontal: ms(15),
            paddingVertical: mvs(12),
            backgroundColor: colors.secondaryBackground,
          }}
          onPress={toggleModel}
          className={` rounded-[15px] flex-row items-center justify-between ${otherStyles}`}
        >
          {iconName && (
            <Icon
              name={iconName}
              fill={colors.placeHolderText}
              stroke={colors.placeHolderText}
            />
          )}
          <Text
            style={{
              color: value ? colors.primaryText : colors.placeHolderText,
            }}
            className="flex-1 font-rRegular text-[16px] text-left ml-2.5"
          >
            {displayText}
          </Text>
          <Icon
            name="ChevronDown"
            width={20}
            height={20}
            strokeWidth={2.5}
            stroke={colors.secondaryText}
          />
        </TouchableOpacity>
        {error && (
          <Text
            style={{ color: 'coral' }}
            className=" text-[12px] mt-[5px] font-rRegular "
          >
            {error}
          </Text>
        )}
      </>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModel}
        animationType="slide"
      >
        <TouchableOpacity
          onPress={toggleModel}
          style={{ paddingHorizontal: paddingHor }}
          className="flex-1 justify-center items-center bg-black/40"
        >
          <View
            style={{
              backgroundColor: colors.secondaryBackground,
              paddingHorizontal: ms(20),
              paddingTop: mvs(20),
              paddingBottom: mvs(5),
            }}
            className="rounded-lg  w-full max-h-[60%]"
          >
            <View
              style={{ borderColor: colors.borderColor }}
              className="flex-row items-center justify-between border-b pb-4"
            >
              <Text
                style={{ color: colors.primaryText }}
                className="text-[22px] font-rRegular ml-2.5"
              >
                {title}
              </Text>
              <TouchableOpacity onPress={toggleModel}>
                <Icon name="Cross" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={data}
              renderItem={({ item, index }) => (
                <CustomeTouchableOpacity
                  dropDown
                  onPress={() => selectItem(item)}
                  otherStyles={{
                    paddingVertical: mvs(12),
                    marginTop: index === 0 ? mvs(5) : 0,
                  }}
                >
                  <Text
                    style={{ color: colors.primaryText }}
                    className="text-[18px] font-rRegular text-center"
                  >
                    {item}
                  </Text>
                </CustomeTouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
