import { Validation } from "./validation-types";
import { getDateTimestamp } from "./validation-utils";

export const dateMaxRule: Validation = {
  label: 'Maximum Date',
  type: "dateMax",
  validate: (value, obj) => {
    const dateValue = getDateTimestamp(value)
    const maxValue = getDateTimestamp(obj.value)

    if (dateValue === null || maxValue === null) {
      return dateValue === null
    }

    return dateValue <= maxValue
  },
  component: () => {
    return (
      <div>
        <p>Maximum date</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "dateMax"
  }),
  fields: [
    { type: 'text', key: 'value', label: 'Maximum Date' },
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
