import { Validation } from "./validation-types";
import { getStringValue } from "./validation-utils";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const emailFormatRule: Validation = {
  label: 'email format',
  type: "emailFormat",
  validate: (value) => {
    const rawValue = getStringValue(value).trim()
    return rawValue === '' ? true : emailRegex.test(rawValue)
  },
  component: () => {
    return (
      <div>
        <p>Email format</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "emailFormat"
  }),
  fields: [
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
