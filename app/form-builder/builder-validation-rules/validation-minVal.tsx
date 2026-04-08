import { Validation } from "./validation-types";

export const minValueRule: Validation = {
  label: 'Minimum Value',
  type: "minValue",
  validate: (value, obj) => Number(value) >= Number(obj.value),
  component: () => <span />,
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "minValue"
  }),
  fields: [
    { type: 'number', key: 'value', label: 'Minimum Value' },
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
