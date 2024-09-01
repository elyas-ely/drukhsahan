import { View, Text, ImageBackground, ScrollView } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import Icon from './shared/Icon';
import Header from './shared/Header';
import CustomInput from './shared/CustomInput';
import { useForm } from '../Hooks/useForm';
import { useNotification } from '@contexts/NotificationContext';
import { useLoading } from '@contexts/LoadingContext';
import { ms, mvs, vs } from 'react-native-size-matters';
import { paddingHor } from '@functions';
import { Image } from 'expo-image';
import { blurhash } from '../utils';
import { profileValidationRules } from '@validations/validationRules';

const initialProfileform = {
  placeName: 'افغان موټر سټور',
  title: 'هر ډول موټر د افغان شورم څخه ترلاس کړی په مناسب قیمت',
  description:
    'افغان موټر سټور تاسو ته د موټرانو به بخش کی موټران خدمت وړاندی کوو او موږ هیله مند یو چی ووا',
  phonenumber: '0702426972',
  location: 'کندهار,افغانستان',
  whatsappLink: 'https://whatsapp.com',
  facebookLink: 'https://facebook.com',
  twitterLink: 'https:www.twiiter.com',
};

export default function EditProfileInfo() {
  const { colors } = useTheme();
  const { showNotification } = useNotification();
  const { showLoading, dismissLoading } = useLoading();

  const { handleErrors, form, errors, handleChange } = useForm(
    initialProfileform,
    profileValidationRules
  );

  const handleFormSubmit = () => {
    const isFormValid = handleErrors();
    if (!isFormValid) {
      showNotification('Warning', 'هیله کوو ټول خالی ځایونه ډک کړی');
      return;
    }

    showLoading();

    setTimeout(() => {
      dismissLoading();

      showNotification('Success', 'ستاسو پوسټ په بریا سره واستول سو');

      console.log(form);
    }, 3000);
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
      <View style={{ marginTop: mvs(20) }}>
        <Text
          style={{ color: colors.secondaryText, marginBottom: mvs(10) }}
          className="text-[18px] "
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
      <Header
        title="فروفایل تغیر"
        rightIcon="ChevronRight"
        leftButton
        leftButtonTitle={'ثبتول'}
        handleLeftButton={handleFormSubmit}
        // borderNone={true}
      />

      <ScrollView
        className="bg-background flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: vs(190) }}>
          <Image
            placeholder={{ blurhash }}
            className="w-full h-full"
            source={require('@assets/images/BannerImage.png')}
          />
          <View
            style={{ paddingLeft: paddingHor }}
            className="pt-2.5   flex-row items-center absolute -bottom-[50px]"
          >
            {/* ======== second profile image ======= */}
            <View
              style={{
                borderColor: colors.secondaryBackground,
                borderWidth: 4,
              }}
              className="w-[80px] h-[80px] rounded-full overflow-hidden relative -mt-10 z-20 "
            >
              <Image
                placeholder={{ blurhash }}
                className="w-full h-full"
                source={require('@assets/images/user.png')}
              />
            </View>
            <View
              style={{ backgroundColor: colors.darkPrimary }}
              className="p-[5px] rounded-full absolute right-1 bottom-0 z-20"
            >
              <Icon name="Camera" width={20} height={20} fill={'#20202B'} />
            </View>
          </View>
          <View
            style={{
              backgroundColor: colors.darkPrimary,
              bottom: mvs(20),
              right: paddingHor,
            }}
            className="p-[5px] rounded-full absolute"
          >
            <Icon name="Camera" width={20} height={20} fill={'#20202B'} />
          </View>
        </View>

        {/* ======== edit profile form ======== */}

        <View
          style={{
            backgroundColor: colors.secondaryBackground,
            borderColor: colors.borderColor,
            paddingHorizontal: paddingHor,
            paddingVertical: mvs(20),
            paddingTop: mvs(50),
          }}
        >
          {renderInput('placeName', { placeholder: 'شوروم نوم' })}
          {renderInput('title', {
            placeholder: 'شعاري عنوان',
            isMultiline: true,
            multilineHeight: 'h-[80px]',
          })}
          {renderInput('description', {
            placeholder: 'شوروم په اړه',
            isMultiline: true,
          })}
          {renderInput('phonenumber', {
            placeholder: 'ټلیفون شمېره',
            numeric: true,
          })}
          {renderInput('location', { placeholder: 'موقیعت' })}
          {renderInput('whatsappLink', {
            placeholder: 'وټساپ لینک',
            link: true,
          })}
          {renderInput('facebookLink', {
            placeholder: 'فیسبوک لینک',
            link: true,
          })}
          {renderInput('twitterLink', {
            placeholder: 'ایکس لینک',
            link: true,
          })}
        </View>
      </ScrollView>
    </View>
  );
}
