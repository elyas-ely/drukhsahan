import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import Header from './Header';
import Icon from './Icon';
import _ from 'lodash';
import { router, usePathname } from 'expo-router';
import { cars } from '@constants/data.json';
import Section from './Section';
import CustomeTouchableOpacity from './CustomTouchableOpacity';
import { ms, mvs } from 'react-native-size-matters';
import { paddingHor } from '@functions';
import { useNotification } from '@contexts/NotificationContext';
import LottieView from 'lottie-react-native';

export default function SearchModel({
  setSearchText,
  searchText,
  toggleModel,
  history = false,
  // history = [
  //   { name: 'مارک ایکس' },
  //   { name: 'فیلډر' },
  //   { name: 'فراری' },
  //   { name: 'لمبرګینی' },
  // ],
}) {
  const pathname = usePathname();
  const [suggestions, setSuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState(searchText ? searchText : '');
  const { showNotification } = useNotification();

  const { colors } = useTheme();

  useEffect(() => {
    const handleSuggestments = _.debounce((value) => {
      const filteredSuggestions =
        value.length > 0
          ? cars?.filter((car) =>
              car.name.toLowerCase().includes(value.toLowerCase())
            )
          : [];
      setSuggestions(filteredSuggestions);
    }, 50);
    handleSuggestments(searchValue);
  }, [searchValue]);

  const handleSearchSelection = (value) => {
    if (!value) {
      showNotification('Warning', 'هیله کوو یو سه ولیکئ');
      return;
    }

    if (pathname === '/screens/searchScreen') {
      setSearchText(value);
    } else {
      router.push({
        pathname: 'screens/searchScreen',
        params: { value },
      });
    }
    toggleModel();
  };
  return (
    <View
      className="absolute bottom-0 left-0 right-0 h-full z-20"
      style={{ flex: 1, backgroundColor: colors.secondaryBackground }}
    >
      {/* Modal content */}
      <Header
        rightIcon={'ChevronRight'}
        handleRightIcon={toggleModel}
        searchInput={
          <View className="flex-1 flex-row items-center mx-[5px] ">
            <TextInput
              autoFocus
              onSubmitEditing={() => handleSearchSelection(searchValue)}
              placeholder="موټر لټون..."
              value={searchValue}
              onChangeText={(value) => setSearchValue(value)}
              placeholderTextColor={colors.placeHolderText}
              returnKeyType="search"
              style={{ color: colors.primaryText }}
              className="text-[18px] font-rBold text-right flex-1 "
            />
            {searchValue && (
              <CustomeTouchableOpacity
                onPress={() => setSearchValue('')}
                otherStyles={{ marginRight: -14 }}
              >
                <Icon
                  name="Cross"
                  width={20}
                  height={20}
                  strokeWidth={2.5}
                  stroke={colors.secondaryText}
                />
              </CustomeTouchableOpacity>
            )}
          </View>
        }
      />
      <FlatList
        ListHeaderComponent={
          <>
            {!history
              ? !searchValue && (
                  <LottieView
                    autoPlay
                    style={{
                      width: '100%',
                      height: mvs(300),
                      // backgroundColor: '#eee',
                    }}
                    // Find more Lottie files at https://lottiefiles.com/featured
                    source={require('@assets/animations/searchHistory.json')}
                  />
                )
              : !searchValue && (
                  <Section
                    title={'مخکني'}
                    deleteHistory={true}
                    otherStyles={{
                      marginTop: mvs(20),
                      paddingHorizontal: paddingHor,
                      marginBottom: ms(20),
                    }}
                  />
                )}
          </>
        }
        data={searchValue ? suggestions : history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          // ========== suggestion items =============== //

          <CustomeTouchableOpacity
            onPress={() => handleSearchSelection(item.name)}
            dropDown
            otherStyles={{
              flexDirection: 'row',
              justifyContent: 'space-between',

              paddingHorizontal: paddingHor,
              paddingVertical: mvs(20),
              alignItem: 'center',
            }}
          >
            <View className="flex-row items-center ">
              <Icon
                name={suggestions?.length === 0 ? 'Clock' : 'Search'}
                fill={colors.secondaryText}
                stroke={colors.secondaryText}
                width={20}
                height={20}
              />
              <Text
                style={{ color: colors.primaryText }}
                className="text-[18px] font-rMedium ml-2.5"
              >
                {item.name}
              </Text>
            </View>
            <View className="-mr-0.5">
              <Icon
                name="ChevronLeft"
                width={20}
                height={20}
                stroke={colors.secondaryText}
                strokeWidth={2.5}
              />
            </View>
          </CustomeTouchableOpacity>
        )}
      />
    </View>
  );
}
