import { Validation } from "./validation-types";
import { getDateTimestamp } from "./validation-utils";

export const dateMinRule: Validation = {
  label: 'minimum date',
  type: "dateMin",
  validate: (value, obj) => {
    const dateValue = getDateTimestamp(value)
    const minValue = getDateTimestamp(obj.value)

    if (dateValue === null || minValue === null) {
      return dateValue === null
    }

    return dateValue >= minValue
  },
  component: () => {
    return (
      <div>
        <p>Minimum date</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "dateMin"
  }),
  fields: [
    { type: 'text', key: 'value', label: 'Minimum Date' },
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
