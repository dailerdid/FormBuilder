import { Validation } from "./validation-types";
import { getStringValue } from "./validation-utils";

export const patternRule: Validation = {
  label: 'pattern match',
  type: "pattern",
  validate: (value, obj) => {
    const rawValue = getStringValue(value).trim()
    const expression = getStringValue(obj.value)

    if (rawValue === '' || expression.trim() === '') {
      return true
    }

    try {
      return new RegExp(expression).test(rawValue)
    } catch {
      return false
    }
  },
  component: () => {
    return (
      <div>
        <p>Pattern validation</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "pattern"
  }),
  fields: [
    { type: 'text', key: 'value', label: 'Pattern' },
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
