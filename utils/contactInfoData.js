import {
  AntDesign,
  Entypo,
  Ionicons,
  FontAwesome5,
  FontAwesome6,
} from "@expo/vector-icons"
import {
  makePhoneCall,
  OpenWhatsapp,
  openFacebook,
  openX,
} from "./contactServices"
import { formatDate } from "./DateFormatter"

export const getContactInfo = (
  user,
  location,
  phoneNumber,
  whatsapp,
  facebook,
  x,
  edit
) => {
  const contactInfo = [
    {
      icon: Entypo,
      iconName: "address",
      text: location || user?.location,
      editedValue: "location",
    },
    {
      icon: Ionicons,
      iconName: "call",
      text: phoneNumber || user?.phoneNumber,
      handlePress: () => makePhoneCall(phoneNumber || user?.phoneNumber),
      editedValue: "phoneNumber",
    },
    {
      icon: FontAwesome5,
      iconName: "whatsapp",
      text: whatsapp || user?.whatsapp,
      handlePress: () => OpenWhatsapp(whatsapp || user?.whatsapp),
      editedValue: "whatsapp",
    },
    {
      icon: Entypo,
      iconName: "facebook",
      text: facebook || user?.facebook || "",
      handlePress: () => openFacebook(facebook || user?.facebook),
      editedValue: "facebook",
      link: true,
    },
    {
      icon: FontAwesome6,
      iconName: "square-x-twitter",
      text: x || user?.x || "",
      handlePress: () => openX(x || user?.x),
      editedValue: "x",
      link: true,
    },
  ]

  // Add the last ContactSingleInfo only if not in edit mode
  if (!edit) {
    contactInfo.push({
      icon: AntDesign,
      iconName: "clockcircle",
      text: formatDate(user.$createdAt),
      lastComponent: "true",
    })
  }
  return contactInfo
}
