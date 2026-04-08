import { FormElement, normalizeElementInputProps } from "../builder-types/element-types"
import { RadioGroupField } from "../builder-types/form-types"
import { notEqualRule } from "../builder-validation-rules/validation-notEqual"
import { oneOfRule } from "../builder-validation-rules/validation-oneOf"
import { requiredRule } from "../builder-validation-rules/validation-required"

const previewOptions = [
    { id: 'preview-option-1', label: 'Option 1', value: 'option_1' },
    { id: 'preview-option-2', label: 'Option 2', value: 'option_2' },
]

const getRadioOptions = (options?: RadioGroupField['options']): NonNullable<RadioGroupField['options']> => (options?.length ?? 0) > 0 ? options! : previewOptions

export const RadioGroupElement: FormElement<RadioGroupField> = {
    type: 'radio-group',

    construct: (id) => ({
        id,
        type: 'radio-group',
        name: `radio_group_${id}`,
        label: 'Radio Group',
        validation: [],
        options: [],
    }),

    component: (field, inputProps, onChange) => {
        const { value, ...registerProps } = normalizeElementInputProps(inputProps, onChange)
        const selectedValue = typeof value === 'string' ? value : undefined

        return (
            <div className="flex flex-col gap-3 w-full">
                <label className="text-sm font-medium leading-none text-foreground">
                    {field.label}
                </label>
                <div className="flex flex-col gap-2">
                    {getRadioOptions(field.options).map((option) => (
                        <label key={option.id} className="flex items-center gap-3 text-sm text-foreground cursor-pointer">
                            <input
                                {...registerProps}
                                type="radio"
                                value={option.value}
                                checked={selectedValue !== undefined ? selectedValue === option.value : undefined}
                                className="h-4 w-4 shrink-0 border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 accent-primary"
                            />
                            <span>{option.label}</span>
                        </label>
                    ))}
                </div>
            </div>
        )
    },

    properties: [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'options', label: 'Options', type: 'options-control', value: '' },
    ],
    validation: [requiredRule, oneOfRule, notEqualRule]
}