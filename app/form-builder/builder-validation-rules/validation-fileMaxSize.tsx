import { Validation } from "./validation-types";
import { getFiles, getNumberValue } from "./validation-utils";

export const fileMaxSizeRule: Validation = {
  label: 'file max size',
  type: "fileMaxSize",
  validate: (value, obj) => {
    const maxSize = getNumberValue(obj.value)
    const files = getFiles(value)
    return files.length === 0 ? true : files.every((file) => file.size <= maxSize)
  },
  component: () => {
    return (
      <div>
        <p>File maximum size</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "fileMaxSize"
  }),
  fields: [
    { type: 'number', key: 'value', label: 'Maximum File Size' },
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
