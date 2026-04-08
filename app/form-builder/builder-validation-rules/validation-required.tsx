import { Validation } from "./validation-types";

export const requiredRule: Validation = {
  label: 'Required',
  type: "required",
  validate: (value) => {
    if (typeof FileList !== 'undefined' && value instanceof FileList) {
      return value.length > 0
    }

    if (typeof value === 'boolean') {
      return value
    }

    if (Array.isArray(value)) {
      return value.length > 0
    }

    if (typeof value === 'object' && value !== null && 'length' in value && typeof value.length === 'number') {
      return value.length > 0
    }

    if (value === null || value === undefined) {
      return false
    }

    return String(value).trim().length > 0
  },
  component: () => {
    return (
      <div>
        <p>Required field</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "required"
  }),
  fields: [
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}