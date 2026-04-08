import { Validation } from "./validation-types";

export const maxLengthRule: Validation = {
  label: 'Maximum Length',
  type: "maxLength",
  validate: (value, obj) => String(value ?? '').length <= Number(obj.value),
  component: () => <span />,
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "maxLength"
  }),
  fields: [
    { type: 'number', key: 'value', label: 'Maximum Length' },
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
