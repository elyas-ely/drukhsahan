import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native"
import { useTheme } from "@contexts/ThemeContext"
import Header from "@components/shared/Header"
import PostForm from "@components/PostForm"
import { useNotification } from "@contexts/NotificationContext"
import { useForm } from "../../Hooks/useForm"
import { useGlobalContext } from "@contexts/GlobalProvider"
import { useLoading } from "@contexts/LoadingContext"
import { carValidationRules } from "@validations/validationRules"
import { useCreatePost } from "../../lib/tan-stack/posts/postQueries"
import { router } from "expo-router"

export default function CreatePost() {
  const { user } = useGlobalContext()

  const initialFormState = {
    images: [],
    carName: "",
    price: "",
    model: "",
    engine: "",
    speed: "",
    transmission: "",
    fuelType: "",
    side: "",
    color: "",
    information: "",
    userId: user.$id,
  }
  const { colors } = useTheme()
  const { showNotification } = useNotification()
  const { showLoading, dismissLoading } = useLoading()
  const { handleErrors, form, setForm, errors, handleChange } = useForm(
    initialFormState,
    carValidationRules
  )

  // Query
  const { mutateAsync: createPost, isLoading: isLoadingCreate } =
    useCreatePost()

  const handleSendPost = async () => {
    try {
      showLoading()
      await createPost(form)
      router.replace("(tabs)/home")
    } catch (error) {
      console.log(error)
      dismissLoading()
    } finally {
      dismissLoading()
    }
  }
  // const handleFormSubmit = () => {
  //   const isFormValid = handleErrors()
  //   if (!isFormValid) {
  //     showNotification("Warning", "هیله کوو ټول خالی ځایونه ډک کړی")
  //     return
  //   }

  //   showLoading()

  //   setTimeout(() => {
  //     dismissLoading()

  //     showNotification("Success", "ستاسو پوسټ په بریا سره واستول سو")

  //     console.log(form)
  //   }, 3000)
  // }
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        leftButton={true}
        leftButtonTitle="استول"
        title="پوسټ کول"
        handleLeftButton={handleSendPost} // Submit the form when the left button is pressed
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <PostForm
          handleChange={handleChange}
          postForm={form}
          errors={errors}
          setForm={setForm}
        />
      </ScrollView>
    </View>
  )
}
