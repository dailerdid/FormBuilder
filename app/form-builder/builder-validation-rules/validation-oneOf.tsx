import { Validation } from "./validation-types";
import { getDelimitedValues, getStringValue } from "./validation-utils";

export const oneOfRule: Validation = {
  label: 'One Of',
  type: "oneOf",
  validate: (value, obj) => {
    const allowedValues = getDelimitedValues(obj.value)
    return allowedValues.length === 0 ? true : allowedValues.includes(getStringValue(value))
  },
  component: () => {
    return (
      <div>
        <p>One of values</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "oneOf"
  }),
  fields: [
    { type: 'text', key: 'value', label: 'Allowed Values' },
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
