export const validateField = (field, value, rules) => {
  const rule = rules[field]
  if (!rule) return ""

  if (rule.type === "dropdown") {
    if (!value) return `${rule.fieldName} انتخاب کړی`
  } else if (rule.type === "image") {
    if (!value) return `${rule.fieldName} باید یو انځور انتخاب کړی`
  } else {
    if (typeof value === "string") {
      if (value.length < rule.min)
        return `${rule.fieldName} باید د ${rule.min} توری څخه کم نه وی`
      if (value.length > rule.max)
        return `${rule.fieldName} باید د ${rule.max} توری څخه زیات نه وی`
    }
  }

  return ""
}

export const validateForm = (form, rules) => {
  const errors = {}
  Object.keys(rules).forEach((field) => {
    const error = validateField(field, form[field], rules)
    if (error) errors[field] = error
  })
  return errors
}
