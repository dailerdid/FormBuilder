import { BaseValidationRule, Validation } from "./validation-types";

export const minLengthRule: Validation = {
  label: 'minimalyno Drujochek length',
  type: "minLength",
  validate: (value, obj) => String(value ?? '').length >= Number(obj.value),
  component: () => {
    return (
      <div>
        <p>Drujochek min length</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "minLength"
  }),
  fields: [
    { type: 'number', key: 'value', label: 'Minimum Length' },
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
