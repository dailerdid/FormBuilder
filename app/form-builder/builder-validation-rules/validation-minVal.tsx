import { Validation } from "./validation-types";


export const minValueRule: Validation = {
  label: 'Min Value',
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
    { type: 'number', key: 'value', label: 'Minimum Value' },
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
