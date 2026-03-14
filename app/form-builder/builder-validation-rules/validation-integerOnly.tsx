import { Validation } from "./validation-types";

export const integerOnlyRule: Validation = {
  label: 'integer only',
  type: "integerOnly",
  validate: (value) => {
    const numericValue = Number(value)
    return Number.isNaN(numericValue) ? false : Number.isInteger(numericValue)
  },
  component: () => {
    return (
      <div>
        <p>Integer only</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "integerOnly"
  }),
  fields: [
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
