import { Validation } from "./validation-types";
import { getStringValue } from "./validation-utils";

export const urlFormatRule: Validation = {
  label: 'url format',
  type: "urlFormat",
  validate: (value) => {
    const rawValue = getStringValue(value).trim()

    if (rawValue === '') {
      return true
    }

    try {
      new URL(rawValue)
      return true
    } catch {
      return false
    }
  },
  component: () => {
    return (
      <div>
        <p>URL format</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "urlFormat"
  }),
  fields: [
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
