import { Validation } from "./validation-types";
import { getCollectionLength, getNumberValue } from "./validation-utils";

export const minSelectedRule: Validation = {
  label: 'Minimum Selected',
  type: "minSelected",
  validate: (value, obj) => getCollectionLength(value) >= getNumberValue(obj.value),
  component: () => {
    return (
      <div>
        <p>Minimum selected</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "minSelected"
  }),
  fields: [
    { type: 'number', key: 'value', label: 'Minimum Selected Count' },
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
