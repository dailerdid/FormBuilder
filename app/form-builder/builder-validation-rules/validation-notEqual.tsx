import { Validation } from "./validation-types";
import { getStringValue } from "./validation-utils";

export const notEqualRule: Validation = {
  label: 'Not Equal',
  type: "notEqual",
  validate: (value, obj) => getStringValue(value) !== getStringValue(obj.value),
  component: () => {
    return (
      <div>
        <p>Not equal</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "notEqual"
  }),
  fields: [
    { type: 'text', key: 'value', label: 'Restricted Value' },
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
