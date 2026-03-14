import { Validation } from "./validation-types";
import { getStringValue } from "./validation-utils";

const phoneRegex = /^\+?[\d\s().-]{6,20}$/

export const phoneFormatRule: Validation = {
  label: 'phone format',
  type: "phoneFormat",
  validate: (value) => {
    const rawValue = getStringValue(value).trim()
    return rawValue === '' ? true : phoneRegex.test(rawValue)
  },
  component: () => {
    return (
      <div>
        <p>Phone format</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "phoneFormat"
  }),
  fields: [
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
