import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import Icon from './shared/Icon';
import Header from './shared/Header';
import CustomInput from './shared/CustomInput';
import CustomButton from './shared/CustomButton';
import { useNotification } from '@contexts/NotificationContext';
import { useForm } from '../Hooks/useForm';

import { blurhash } from '../utils';
import { Image } from 'expo-image';
import { userEditValidationRules } from '@validations/validationRules';

const initialsUser = {
  email: 'samisam74300@gmail.com',
  name: 'سمیع',
};
export default function EditUserProfileInfo() {
  const { colors } = useTheme();

  const { showNotification } = useNotification();
  const { handleErrors, form, errors, handleChange } = useForm(
    initialsUser,
    userEditValidationRules
  );

  const handleFormSubmit = () => {
    const isFormValid = handleErrors();
    if (!isFormValid) {
      showNotification('Warning', 'هیله کوو ټول خالی ځایونه ډک کړی');
      return;
    }

    // Submit the form if valid
    showNotification('Success', 'ستاسو پروفایل په بریا سره تغیر سو');
    console.log(form);
  };
  const renderInput = (field, options = {}) => {
    const {
      placeholder,
      isMultiline = false,
      multilineHeight,
      link = false,
      numeric = false,
    } = options;

    return (
      <View className="mt-5">
        <Text
          style={{ color: colors.secondaryText }}
          className="text-[18px] mb-[10px]"
        >
          {placeholder}
        </Text>
        <CustomInput
          placeholder={placeholder}
          isMultiline={isMultiline}
          multilineHeight={multilineHeight}
          handleChangeText={(e) => handleChange(field, e)}
          value={form[field]}
          otherStyles="rounded-[7px] "
          numericType={numeric}
          withOutIcon={true}
          border={true}
          link={link}
          error={errors[field]}
        />
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: colors.secondaryBackground, flex: 1 }}>
      <Header title="پروفایل تغیر" rightIcon="ChevronRight" borderNone={true} />

      <View className="flex-1">
        <View className="  flex-row items-center self-center mt-5  ">
          {/* ======== second profile image ======= */}
          <View className="w-[80px] h-[80px] rounded-full overflow-hidden   ">
            <Image
              placeholder={{ blurhash }}
              className="w-full h-full"
              source={require('@assets/images/user.png')}
            />
          </View>
          <View
            style={{ backgroundColor: colors.darkPrimary }}
            className="p-[5px] rounded-full absolute right-0 bottom-0 z-20"
          >
            <Icon name="Camera" width={20} height={20} fill={'#20202B'} />
          </View>
        </View>
        <ScrollView>
          <View
            className="p-5 pt-[30px]  "
            style={{
              backgroundColor: colors.secondaryBackground,
              borderColor: colors.borderColor,
            }}
          >
            {renderInput('name', { placeholder: 'نوم' })}
            {renderInput('email', { placeholder: 'ایمیل' })}
          </View>
          <CustomButton
            title={'ثبتول'}
            handlePress={handleFormSubmit}
            otherStyles="mx-5"
          />
        </ScrollView>
      </View>
    </View>
  );
}
