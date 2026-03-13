import { Validation } from "./validation-types";


export const minValueRule: Validation = {
  label: 'minimalyno Drujochek value',
  type: "minValue",
  validate: (value, obj) => Number(value) >= Number(obj.value),
  component: () => {
    return (
      <div>
        <p>Drujochek</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "minValue"
  }),
  fields: [
    { type: 'number', key: 'value' },
    { type: 'text', key: 'errorMessage' }
  ]
}
