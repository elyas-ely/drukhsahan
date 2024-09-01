import { View, Button, Text } from "react-native"
import Section from "./shared/Section"
import CustomInput from "./shared/CustomInput"
import Dropdown from "./shared/Dropdown"
import ImageSelecter from "@components/ImageSelecter"
import PostColors from "./PostColors"
import { years } from "@constants/data.json"
import { ms, mvs } from "react-native-size-matters"
import { paddingHor } from "@functions"

export default function PostForm({ postForm, errors, handleChange, setForm }) {
  const renderField = (field, type, options = {}) => {
    const {
      placeholder,
      icon,
      isMultiline = false,
      numeric = false,
      data = [],
    } = options

    const commonProps = {
      value: postForm[field],
      error: errors[field],
    }

    return type === "input" ? (
      <CustomInput
        placeholder={placeholder}
        icon={icon}
        isMultiline={isMultiline}
        handleChangeText={(e) => handleChange(field, e)}
        numericType={numeric}
        {...commonProps}
      />
    ) : (
      <Dropdown
        iconName={icon}
        title={placeholder}
        data={data}
        onSelect={(e) => handleChange(field, e)}
        {...commonProps}
      />
    )
  }

  return (
    <View>
      <ImageSelecter images={postForm.images} setForm={setForm} />
      <Section otherStyles={{ marginTop: mvs(20) }} title="پېژندنه">
        <View style={{ paddingHorizontal: paddingHor }}>
          {renderField("carName", "input", { placeholder: "نوم", icon: "Car" })}
          <View style={{ marginTop: mvs(15) }} className="flex-row ">
            <View className="flex-1">
              {renderField("price", "input", {
                placeholder: "نرخ",
                icon: "Coin",
                numeric: true,
              })}
            </View>
            <View style={{ marginLeft: ms(20) }} className="flex-1">
              {renderField("model", "dropdown", {
                placeholder: "ماډل",
                icon: "Year",
                data: years,
              })}
            </View>
          </View>
        </View>
      </Section>
      <Section otherStyles={{ marginTop: mvs(20) }} title="ځانګړتیاوي">
        <View style={{ paddingHorizontal: paddingHor }}>
          {renderField("engine", "input", {
            placeholder: "اینجن",
            icon: "Engine",
          })}
          <View style={{ marginTop: mvs(15) }}>
            {renderField("speed", "input", {
              placeholder: "سرعت",
              icon: "Speed",
            })}
          </View>
          <View style={{ marginVertical: mvs(15) }} className="flex-row">
            <View style={{ marginRight: ms(20) }} className="flex-1">
              {renderField("transmission", "dropdown", {
                placeholder: "ډول",
                icon: "Transmission",
                data: ["اتومات", "ګیری"],
              })}
            </View>
            <View className="flex-1">
              {renderField("fuelType", "dropdown", {
                placeholder: "تېل ډول",
                icon: "FuelType",
                data: ["پطرول", "ډیزلی", "هایبریډ"],
              })}
            </View>
          </View>
          {renderField("side", "dropdown", {
            placeholder: "طرف",
            icon: "Side",
            data: ["راسته", "چپه"],
          })}
        </View>
      </Section>
      <Section otherStyles={{ marginTop: mvs(20) }} title="بڼه">
        <PostColors
          selectedColor={postForm.color}
          onSelect={(e) => handleChange("color", e)}
          error={errors.color}
        />
      </Section>
      <Section otherStyles={{ marginTop: mvs(20) }} title="موټر په اړه">
        <View style={{ paddingHorizontal: paddingHor }} className="flex-1">
          {renderField("information", "input", {
            placeholder: "معلومات موټر په اړه...",
            isMultiline: true,
          })}
        </View>
      </Section>
    </View>
  )
}
