import { FormElement, normalizeElementInputProps } from "../builder-types/element-types"
import { TextareaField } from "../builder-types/form-types"
import { maxLengthRule } from "../builder-validation-rules/validation-maxLen"
import { minLengthRule } from "../builder-validation-rules/validation-minLen"
import { notEqualRule } from "../builder-validation-rules/validation-notEqual"
import { patternRule } from "../builder-validation-rules/validation-pattern"
import { requiredRule } from "../builder-validation-rules/validation-required"

export const TextareaElement: FormElement<TextareaField> = {
    type: 'textarea',

    construct: (id) => ({
        id,
        type: 'textarea',
        name: `textarea_${id}`,
        label: 'Textarea',
        validation: [],
        placeholder: 'Write something...',
        rows: 4,
    }),

    component: (field, inputProps, onChange) => {
        const { value, ...registerProps } = normalizeElementInputProps(inputProps, onChange)

        return (
            <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium leading-none text-foreground">
                    {field.label}
                </label>
                <textarea
                    {...registerProps}
                    rows={field.rows}
                    value={typeof value === 'string' ? value : undefined}
                    className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                    placeholder={field.placeholder}
                />
            </div>
        )
    },
    properties: [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'placeholder', label: 'Placeholder', type: 'text' },
        { key: 'rows', label: 'Rows', type: 'number' },
    ],
    validation: [requiredRule, minLengthRule, maxLengthRule, patternRule, notEqualRule]
}