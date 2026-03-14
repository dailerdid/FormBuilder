import { Validation } from "./validation-types";
import { getCollectionLength, getNumberValue } from "./validation-utils";

export const maxSelectedRule: Validation = {
  label: 'maximum selected',
  type: "maxSelected",
  validate: (value, obj) => getCollectionLength(value) <= getNumberValue(obj.value),
  component: () => {
    return (
      <div>
        <p>Maximum selected</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "maxSelected"
  }),
  fields: [
    { type: 'number', key: 'value', label: 'Maximum Selected Count' },
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
