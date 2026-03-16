import { Validation } from "./validation-types";
import { getFiles, getNumberValue } from "./validation-utils";

export const fileMinSizeRule: Validation = {
  label: 'file min size',
  type: "fileMinSize",
  validate: (value, obj) => {
    const minSize = getNumberValue(obj.value)
    const files = getFiles(value)
    return files.length === 0 ? true : files.every((file) => file.size >= minSize)
  },
  component: () => {
    return (
      <div>
        <p>File minimum size</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "fileMinSize"
  }),
  fields: [
    { type: 'number', key: 'value', label: 'Minimum File Size' },
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
