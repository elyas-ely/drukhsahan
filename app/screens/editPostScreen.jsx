import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import Header from '@components/shared/Header';
import PostForm from '@components/PostForm';
import { useNotification } from '@contexts/NotificationContext';
import { useForm } from '../../Hooks/useForm';
import { carValidationRules } from '@validations/validationRules';

const initialFormState = {
  images: [
    'https://car-images.bauersecure.com/wp-images/4738/1752x1168/should_i_buy_an_electric_car.jpg?mode=max&quality=90&scale=down',
  ],
  carName: 'مرسډیز',
  price: '2300',
  model: '2019',
  engine: 'v8',
  speed: '130km/h',
  transmission: 'اتوماتیک',
  fuelType: 'پطرول',
  side: 'راسته',
  seats: '4',
  color: 'سور',
  description:
    'افغان موټر سټور تاسو ته د موټرانو به بخش کی موټران خدمت وړاندی کوو او موږ هیله مند یو چی ووا',
};

export default function EditPost() {
  const { colors } = useTheme();
  const { showNotification } = useNotification();
  const { handleErrors, form, errors, handleChange } = useForm(
    initialFormState,
    carValidationRules
  );

  const handleFormSubmit = () => {
    const isFormValid = handleErrors();
    if (!isFormValid) {
      showNotification('Warning', 'هیله کوو ټول خالی ځایونه ډک کړی');
      return;
    }

    // Submit the form if valid
    showNotification('Success', 'ستاسو پوسټ په بریا سره واستول سو');
    console.log(form);
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header
        leftButton={true}
        leftButtonTitle="تغیرول"
        title="پوست تغیرول"
        handleLeftButton={handleFormSubmit} // Submit the form when the left button is pressed
        rightIcon="ChevronRight"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <PostForm handleChange={handleChange} postForm={form} errors={errors} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
