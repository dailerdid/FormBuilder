import { Validation } from "./validation-types";

export const minLengthRule: Validation = {
  label: 'Minimum Length',
  type: "minLength",
  validate: (value, obj) => String(value ?? '').length >= Number(obj.value),
  component: () => <span />,
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
