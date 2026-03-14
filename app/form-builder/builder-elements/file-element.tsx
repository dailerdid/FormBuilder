import { FormElement, normalizeElementInputProps } from "../builder-types/element-types"
import { FileField } from "../builder-types/form-types"
import { fileCountMaxRule } from "../builder-validation-rules/validation-fileCountMax"
import { fileMaxSizeRule } from "../builder-validation-rules/validation-fileMaxSize"
import { fileMinSizeRule } from "../builder-validation-rules/validation-fileMinSize"
import { fileTypeRule } from "../builder-validation-rules/validation-fileType"
import { requiredRule } from "../builder-validation-rules/validation-required"

export const FileElement: FormElement<FileField> = {
    type: 'file',

    construct: (id) => ({
        id,
        type: 'file',
        name: `file_${id}`,
        label: 'Upload File',
        validation: [],
        accept: '',
        multiple: false,
    }),

    component: (field, inputProps, onChange) => {
        const { value, ...registerProps } = normalizeElementInputProps(inputProps, onChange)
        const fileList = typeof FileList !== 'undefined' && value instanceof FileList ? Array.from(value) : []

        return (
            <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium leading-none text-foreground">
                    {field.label}
                </label>
                <input
                    {...registerProps}
                    type="file"
                    accept={field.accept || undefined}
                    multiple={field.multiple}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {fileList.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {fileList.map((file) => (
                            <span key={`${file.name}-${file.size}`} className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                                {file.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        )
    },
    properties: [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'accept', label: 'Accept', type: 'text' },
        { key: 'multiple', label: 'Allow Multiple', type: 'check' },
    ],
    validation: [requiredRule, fileMaxSizeRule, fileMinSizeRule, fileTypeRule, fileCountMaxRule]
}