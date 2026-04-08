import { Validation } from "./validation-types";
import { getDateTimestamp } from "./validation-utils";

export const dateRangeRule: Validation = {
  label: 'Date Range',
  type: "dateRange",
  validate: (value, obj) => {
    const dateValue = getDateTimestamp(value)
    const minValue = getDateTimestamp(obj.value)
    const maxValue = getDateTimestamp(obj.compareValue)

    if (dateValue === null || minValue === null || maxValue === null) {
      return dateValue === null
    }

    return dateValue >= minValue && dateValue <= maxValue
  },
  component: () => {
    return (
      <div>
        <p>Date range</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    compareValue: obj.compareValue,
    errorMessage: obj.errorMessage,
    type: "dateRange"
  }),
  fields: [
    { type: 'text', key: 'value', label: 'Start Date' },
    { type: 'text', key: 'compareValue', label: 'End Date' },
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
