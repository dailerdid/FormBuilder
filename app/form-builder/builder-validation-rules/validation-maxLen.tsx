import { Validation } from "./validation-types";

export const maxLengthRule: Validation = {
  label: 'maximalyno Drujochek length',
  type: "maxLength",
  validate: (value, obj) => String(value ?? '').length <= Number(obj.value),
  component: () => {
    return (
      <div>
        <p>Drujochek max length</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "maxLength"
  }),
  fields: [
    { type: 'number', key: 'value' },
    { type: 'text', key: 'errorMessage' }
  ]
}
