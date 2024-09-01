import React, { useState, useCallback } from 'react';
import {
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import Header from './shared/Header';
import Section from './shared/Section';
import PostColors from './PostColors';
import CustomButton from './shared/CustomButton';
import Dropdown from './shared/Dropdown';
import { years, engines } from '@constants/data.json';
import Icon from './shared/Icon';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PriceRangeSlider from './PriceRangeSlider';
import { ms, mvs } from 'react-native-size-matters';
import { paddingHor } from '@functions';

const values = {
  min: 0,
  max: 5600000,
};
const initialFilterState = {
  model: '',
  engine: '',
  transmission: '',
  fuelType: '',
  color: '',
  minPrice: values.min,
  maxPrice: values.max,
};

export default function FilterModel() {
  const { colors } = useTheme();
  const [filterForm, setFilterForm] = useState(initialFilterState);

  const [filterModelVisible, setFilterModelVisible] = useState(false);

  const padding = paddingHor;
  const width = Dimensions.get('screen').width;
  const sliderWidth = width - padding * 3;

  const toggleFilterModel = useCallback(() => {
    setFilterModelVisible((prev) => !prev);
  }, []);

  const handleChange = useCallback((field, value) => {
    setFilterForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = () => {
    setFilterForm(initialFilterState);
  };

  return (
    <>
      <TouchableOpacity activeOpacity={0.8} onPress={toggleFilterModel}>
        <Icon name="Filter" width={30} height={30} fill={colors.primary} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={filterModelVisible}
        onRequestClose={toggleFilterModel}
      >
        <Header
          leftButton={true}
          handleLeftButton={resetForm}
          leftButtonTitle="بیا تنظیم"
          removePaddingTop={true}
          title="فلتر"
          rightIcon="Cross"
          handleRightIcon={toggleFilterModel}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, backgroundColor: colors.background }}
        >
          <View style={{ paddingVertical: mvs(20) }}>
            <Section title="ځانګړتیاوي" />
            <View
              style={{
                paddingHorizontal: paddingHor,
                marginBottom: mvs(25),
              }}
            >
              <Dropdown
                iconName="Engine"
                title="اینجن"
                data={engines}
                onSelect={(value) => handleChange('engine', value)}
                value={filterForm.engine}
              />

              <View style={{ marginTop: mvs(15) }} className="flex-row ">
                <Dropdown
                  iconName="Transmission"
                  title="ډول"
                  data={['اتومات', 'ګیری']}
                  otherStyles="flex-1 mr-5"
                  onSelect={(value) => handleChange('transmission', value)}
                  value={filterForm.transmission}
                />
                <Dropdown
                  iconName="FuelType"
                  title="تېل ډول"
                  data={['پطرول', 'ډیزلی', 'هایبریډ']}
                  otherStyles="flex-1"
                  onSelect={(value) => handleChange('fuelType', value)}
                  value={filterForm.fuelType}
                />
              </View>
            </View>

            <Section title="ماډل" />
            <View style={{ marginHorizontal: paddingHor }}>
              <Dropdown
                iconName="Year"
                title="ماډل"
                data={years}
                onSelect={(value) => handleChange('model', value)}
                value={filterForm.model}
              />
            </View>

            <Section
              title="رنګ"
              otherStyles={{
                marginTop: mvs(25),
              }}
            />
            <PostColors
              selectedColor={filterForm.color}
              onSelect={(value) => handleChange('color', value)}
            />
          </View>
          <View>
            <Section title="نرخ" otherStyles={{ marginTop: mvs(5) }} />
            <GestureHandlerRootView>
              <PriceRangeSlider
                min={values.min}
                max={values.max}
                minPrice={filterForm.minPrice}
                maxPrice={filterForm.maxPrice}
                step={10000}
                sliderWidth={sliderWidth}
                onValueChange={({ min, max }) => {
                  handleChange('minPrice', min);
                  handleChange('maxPrice', max);
                }}
                resetTrigger={resetForm}
              />
            </GestureHandlerRootView>
            <View
              style={{
                paddingHorizontal: paddingHor,
                marginTop: mvs(30),
                marginBottom: mvs(20),
              }}
            >
              <CustomButton title="فلتر کول" />
            </View>
          </View>
        </ScrollView>
      </Modal>
    </>
  );
}
