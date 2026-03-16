import { Validation } from "./validation-types";


export const maxValueRule: Validation = {
  label: 'maximalyno Drujochek value',
  type: "maxValue",
  validate: (value, obj) => Number(value) <= Number(obj.value),
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
    type: "maxValue"
  }),
  fields: [
    { type: 'number', key: 'value', label: 'Maximum Value' },
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
