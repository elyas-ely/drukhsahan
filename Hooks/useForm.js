// useForm.js
import { useState } from "react"
import { validateField, validateForm } from "@validations/index"

export function useForm(initialFormState, validationRules) {
  const [form, setForm] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))

    if (isSubmitted) {
      const error = validateField(field, value, validationRules)
      setErrors((prev) => ({ ...prev, [field]: error }))
    }
  }

  const handleErrors = () => {
    const formErrors = validateForm(form, validationRules)
    setIsSubmitted(true)
    setErrors(formErrors)

    return Object.keys(formErrors).length === 0
  }

  return {
    form,
    setForm,
    errors,
    handleChange,
    handleErrors,
  }
}
