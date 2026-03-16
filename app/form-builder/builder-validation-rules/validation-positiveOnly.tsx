import { Validation } from "./validation-types";

export const positiveOnlyRule: Validation = {
  label: 'positive only',
  type: "positiveOnly",
  validate: (value) => Number(value) > 0,
  component: () => {
    return (
      <div>
        <p>Positive only</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "positiveOnly"
  }),
  fields: [
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
