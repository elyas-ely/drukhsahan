import { View, Text, Modal, Dimensions } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import CustomButton from './CustomButton';
import { paddingHor } from '@functions';

export default function MessegeModel({
  messegeModelVisible,
  toggleMessegeModel,
  handleYes,
  logout,
}) {
  const { colors } = useTheme();
  const goodWidth = Dimensions.get('screen').width > 500;
  return (
    <Modal
      animationType="fade"
      transparent
      visible={messegeModelVisible}
      onRequestClose={toggleMessegeModel}
    >
      <View
        style={{ paddingHorizontal: paddingHor }}
        className="flex-1 items-center justify-center bg-black/20"
      >
        <View
          style={{ backgroundColor: colors.secondaryBackground }}
          className=" rounded-lg p-6 w-full"
        >
          <Text
            className="text-[18px] font-rBold mb-4"
            style={{ color: colors.primaryText }}
          >
            تاسو باوری یاست؟
          </Text>
          <Text
            className="text-[16px] font-rRegular mb-6"
            style={{ color: colors.secondaryText }}
          >
            {logout ? (
              <Text>تاسو غواړی چی د اکونټ څخه خارج سی</Text>
            ) : (
              <Text>
                تاسو غواړی چی پوسټ ایسته کړی؟ دا بیا نه راګرځیدونکی عمل دی.
              </Text>
            )}
          </Text>
          <View className="flex-row ">
            <CustomButton
              warning={true}
              warningText={true}
              title="بلی"
              handlePress={handleYes}
              otherStyles={!goodWidth && 'flex-1 '}
            />
            <CustomButton
              title="نه"
              handlePress={toggleMessegeModel}
              warningText={true}
              simple={true}
              otherStyles={!goodWidth ? 'flex-1 ml-5' : 'ml-5'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
