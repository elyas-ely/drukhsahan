export const carValidationRules = {
  carName: { min: 2, max: 50, fieldName: "نوم" },
  price: { min: 2, max: 10, fieldName: "نرخ" },
  model: { min: 2, max: 10, type: "dropdown", fieldName: "ماډل" },
  engine: { min: 2, max: 20, fieldName: "اینجن" },
  speed: { min: 2, max: 10, fieldName: "سرعت" },
  transmission: { min: 2, max: 20, type: "dropdown", fieldName: "ډول" },
  fuelType: { min: 2, max: 20, type: "dropdown", fieldName: "تیل ډول" },
  side: { min: 2, max: 10, type: "dropdown", fieldName: "طرف" },
  color: { min: 2, max: 15, type: "dropdown", fieldName: "رنګ" },
  description: { min: 10, max: 300, fieldName: "معلومات" },
}

// Add similar placeholders for profileValidationRules if needed

export const profileValidationRules = {
  placeName: { min: 2, max: 50, fieldName: "شورم نوم" },
  title: { min: 10, max: 100, fieldName: "عنوان" },
  description: { min: 10, max: 300, fieldName: "معلومات" },
  phonenumber: { min: 10, max: 10, fieldName: "ټیلیفون شماره" }, // Phone number with exactly 10 digits
  location: { min: 2, max: 20, fieldName: "موقیعت" },
  whatsappLink: { min: 10, max: 40, fieldName: "واټسپ لینک" },
  facebookLink: { min: 10, max: 40, fieldName: "فیس بوک لینک" },
  twitterLink: { min: 10, max: 40, fieldName: "ټویټر لینک" },
}

export const userEditValidationRules = {
  name: { min: 3, max: 20, fieldName: "نوم" },
  email: { min: 10, max: 100, fieldName: "ایمیل" },
}

export const signInValidationRules = {
  email: { min: 3, max: 20, fieldName: "ایمیل" },
  password: { min: 5, max: 15, fieldName: "پاسورډ" },
}

export const signUpValidationRules = {
  name: { min: 3, max: 20, fieldName: "نوم" },
  email: { min: 3, max: 20, fieldName: "ایمیل" },
  password: { min: 8, max: 15, fieldName: "پاسورډ" },
  passwordConfirmation: { min: 8, max: 15, fieldName: "پاسورډ تکرار" },
}
