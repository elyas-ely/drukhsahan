import { Platform, Linking } from "react-native";

// ---------- calling the number ----------
export const makePhoneCall = (phoneNumber) => {
  if (Platform.OS === "android") {
    phoneNumber = `tel: ${phoneNumber}`;
  } else {
    phoneNumber = `telprompt: ${phoneNumber}`;
  }

  Linking.openURL(phoneNumber);
};

// ---------- calling Whatsapp ----------
export const OpenWhatsapp = (phoneNumber) => {
  const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;

  Linking.canOpenURL(whatsappUrl).then((supported) => {
    if (supported) {
      return Linking.openURL(whatsappUrl);
    } else {
      console.log("WhatsApp is not installed on your device.");
    }
  });
};

// ---------- opening Facebook ----------
export const openFacebook = (facebookLink) => {
  Linking.openURL(facebookLink);
};

// ---------- opening X ----------
export const openX = (xLink) => {
  Linking.openURL(xLink);
};
