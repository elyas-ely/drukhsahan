import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { cars } from '@constants/data.json';
import SearchModel from '../../components/shared/SearchModel';
import { useLocalSearchParams } from 'expo-router';
import Header from '@components/shared/Header';
import RowCard from '@components/shared/RowCard';
import FilterModel from '../../components/FilterModel';
import { ms, mvs } from 'react-native-size-matters';
import { paddingHor } from '@functions';

export default function SearchScreen() {
  const { value } = useLocalSearchParams();
  const [searchText, setSearchText] = useState(value ? value : '');
  const { colors } = useTheme();
  const [searchedCars, setSearchedCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModel = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const filterdCars = cars?.filter((car) => car.name.includes(searchText));
    setSearchedCars(filterdCars);
    setIsLoading(false);
  }, [searchText, value]);

  const updateSearchText = (value) => {
    setSearchText(value);
  };

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <Header
        rightIcon={'ChevronRight'}
        filter={<FilterModel />}
        searchInput={
          <TouchableOpacity className=" mx-[5px]" onPress={toggleModel}>
            <Text
              style={{ color: colors.primaryText }}
              className="text-[18px] font-rBold "
            >
              {searchText}
            </Text>
          </TouchableOpacity>
        }
      />

      {/* Animated SearchModel */}
      {modalVisible && (
        <View className="absolute top-0 left-0 right-0 h-full z-10">
          <SearchModel
            toggleModel={toggleModel}
            setSearchText={updateSearchText}
            searchText={searchText}
          />
        </View>
      )}
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={searchedCars}
          contentContainerStyle={{
            paddingVertical: mvs(20),
            paddingHorizontal: paddingHor,
          }}
          ItemSeparatorComponent={() => <View className="h-[15px]"></View>}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <RowCard car={item} />}
        />
      )}
    </View>
  );
}
