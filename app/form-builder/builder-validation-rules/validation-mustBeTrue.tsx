import { Validation } from "./validation-types";

export const mustBeTrueRule: Validation = {
  label: 'Must Be True',
  type: "mustBeTrue",
  validate: (value) => value === true,
  component: () => {
    return (
      <div>
        <p>Must be true</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "mustBeTrue"
  }),
  fields: [
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
