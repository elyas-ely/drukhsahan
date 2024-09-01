import { View, Text, TouchableOpacity, Modal, Share } from "react-native"
import { useTheme } from "@contexts/ThemeContext"
import { useEffect, useState } from "react"
import Icon from "./Icon"
import { router } from "expo-router"
import MessegeModel from "./MessegeModel"
import CustomeTouchableOpacity from "./CustomTouchableOpacity"
import { paddingHor } from "@functions"
import { mvs } from "react-native-size-matters"
import {
  useDeletePost,
  useDeleteSavedPost,
  useSavePost,
} from "../../lib/tan-stack/posts/postQueries"
import { useGetCurrentUser } from "../../lib/tan-stack/users/userQueries"
import { useGlobalContext } from "@contexts/GlobalProvider"

export default function MoreMenu({ big, post }) {
  const { colors } = useTheme()

  const [modalVisible, setModalVisible] = useState(false)
  const [messesgeModelVisible, setMessegeModelVisible] = useState(false)
  const toggleMessegModal = () => setMessegeModelVisible(!messesgeModelVisible)
  const toggleModal = () => setModalVisible(!modalVisible)
  const handleShare = async () => {
    try {
      await Share.share({ message: "Check out this post!" })
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  const [isSaved, setIsSaved] = useState(false)
  const { data: currentUser } = useGetCurrentUser()
  const { mutate: savePost, isPending } = useSavePost()
  const { mutate: deleteSavePost, isPending: isUnsaving } = useDeleteSavedPost()
  const { mutate: deletePost } = useDeletePost()

  const savedPostRecord = currentUser?.save.find(
    (record) => record.post?.$id === post?.$id
  )
  // console.log("post ---", savedPostRecord)

  useEffect(() => {
    setIsSaved(!!savedPostRecord)
  }, [currentUser, post])

  const handleSavePost = () => {
    if (savedPostRecord) {
      setIsSaved(false)
      return deleteSavePost(savedPostRecord?.$id)
    }
    savePost({
      userId: currentUser?.$id,
      postId: post.$id,
      accountId: currentUser?.$id,
    })
    setIsSaved(true)
  }

  const handleEdit = () => {
    toggleModal()
    router.push("screens/editPostScreen")
  }
  const handleDelete = () => {
    toggleMessegModal()
  }

  const confirmDelete = async () => {
    try {
      const deletingPost = await deletePost({
        postId: post?.$id,
        imagesIds: post?.imagesIds,
        savedPostId: savedPostRecord?.$id,
      })
      if (!deletePost) {
        throw Error
      } else {
        console.log("deleted")
        toggleMessegModal()
      }
    } catch (error) {
      console.log(error)
    } finally {
      toggleMessegModal()
    }
  }

  const menuItems = [
    {
      name: isSaved ? "FilledBookMark" : "BookMark",
      fill: isSaved ? colors.primary : undefined,
      text: ["ثبتول", "د خوښي په لیست کي"],
      onPress: handleSavePost,
    },
    {
      name: "Share",
      text: ["شریکول", "نورو ملګرو سره"],
      onPress: handleShare,
    },
    {
      name: "Edit",
      text: ["تغیریول", "پوسټ کی تغیر کول"],
      onPress: handleEdit,
    },
    {
      name: "Bin",
      fill: "coral",
      text: ["منځه وړل", "پوسټ ایسته کول"],
      onPress: () => handleDelete(),
    },
  ]

  const filteredMenuItems =
    currentUser?.$id === post?.creator?.$id
      ? menuItems
      : menuItems.filter(
          (item) =>
            item.name === "BookMark" ||
            item.name === "FilledBookMark" ||
            item.name === "Share"
        )

  return (
    <View>
      <CustomeTouchableOpacity marginRight onPress={toggleModal}>
        <Icon
          name="Menu"
          width={big ? 24 : 20}
          height={big ? 24 : 20}
          fill={big ? colors.primaryText : colors.secondaryText}
          stroke={big ? colors.primaryText : colors.secondaryText}
        />
      </CustomeTouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View className="flex-1 bg-black/40 ">
          <TouchableOpacity
            onPress={toggleModal}
            className="flex-1"
          ></TouchableOpacity>
          <View
            style={{
              backgroundColor: colors.secondaryBackground,
              // paddingHorizontal: paddingHor,
              paddingVertical: mvs(20),
            }}
            className="rounded-t-[20px]  w-full"
          >
            {filteredMenuItems.map(({ name, fill, text, onPress }, i) => (
              <CustomeTouchableOpacity
                key={i}
                onPress={onPress}
                dropDown
                otherStyles={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "start",
                  paddingVertical: mvs(10),
                  paddingHorizontal: paddingHor,
                }}
              >
                <Icon name={name} fill={fill} />
                <View className="ml-5">
                  <Text
                    style={{ color: colors.primaryText }}
                    className="text-[18px] font-rRegular"
                  >
                    {text[0]}
                  </Text>
                  <Text
                    style={{ color: colors.secondaryText }}
                    className="text-[14px] font-rRegular"
                  >
                    {text[1]}
                  </Text>
                </View>
              </CustomeTouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <MessegeModel
        handleYes={confirmDelete}
        messegeModelVisible={messesgeModelVisible}
        toggleMessegeModel={toggleMessegModal}
      />
    </View>
  )
}
