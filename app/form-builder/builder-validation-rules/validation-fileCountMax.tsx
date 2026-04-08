import { Validation } from "./validation-types";
import { getCollectionLength, getNumberValue } from "./validation-utils";

export const fileCountMaxRule: Validation = {
  label: 'Max File Count',
  type: "fileCountMax",
  validate: (value, obj) => getCollectionLength(value) <= getNumberValue(obj.value),
  component: () => {
    return (
      <div>
        <p>File count max</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "fileCountMax"
  }),
  fields: [
    { type: 'number', key: 'value', label: 'Maximum File Count' },
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
