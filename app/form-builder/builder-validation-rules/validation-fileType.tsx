import { Validation } from "./validation-types";
import { getDelimitedValues, getFiles, matchesAllowedFileType } from "./validation-utils";

export const fileTypeRule: Validation = {
  label: 'file type',
  type: "fileType",
  validate: (value, obj) => {
    const allowedTypes = getDelimitedValues(obj.value)
    const files = getFiles(value)

    if (allowedTypes.length === 0 || files.length === 0) {
      return true
    }

    return files.every((file) => allowedTypes.some((allowedType) => matchesAllowedFileType(file, allowedType)))
  },
  component: () => {
    return (
      <div>
        <p>File type</p>
      </div>
    )
  },
  construct: (obj) => ({
    value: obj.value,
    errorMessage: obj.errorMessage,
    type: "fileType"
  }),
  fields: [
    { type: 'text', key: 'value', label: 'Allowed File Types' },
    { type: 'text', key: 'errorMessage', label: 'Error Message' }
  ]
}
