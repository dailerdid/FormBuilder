import { FormElement, normalizeElementInputProps } from "../builder-types/element-types"
import { NumberField } from "../builder-types/form-types"
import { integerOnlyRule } from "../builder-validation-rules/validation-integerOnly"
import { maxValueRule } from "../builder-validation-rules/validation-maxVal"
import { minValueRule } from "../builder-validation-rules/validation-minVal"
import { notEqualRule } from "../builder-validation-rules/validation-notEqual"
import { oneOfRule } from "../builder-validation-rules/validation-oneOf"
import { positiveOnlyRule } from "../builder-validation-rules/validation-positiveOnly"
import { requiredRule } from "../builder-validation-rules/validation-required"

const getResolvedNumberValue = (value: unknown, defaultValue: number) => typeof value === 'number'
    ? value
    : typeof value === 'string' && value !== ''
        ? Number(value)
        : defaultValue

export const NumberElement: FormElement<NumberField> = {
    type: 'number',

    construct: (id) => ({
        id,
        type: 'number',
        name: `number_${id}`,
        label: 'Number',
        validation: [],
        placeholder: 'Enter number',
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 0,
    }),

    component: (field, inputProps, onChange) => {
        const { value, ...registerProps } = normalizeElementInputProps(inputProps, onChange)
        const resolvedValue = getResolvedNumberValue(value, field.defaultValue)

        return (
            <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium leading-none text-foreground">
                    {field.label}
                </label>
                <input
                    {...registerProps}
                    type="number"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    {...(value !== undefined ? { value: resolvedValue } : { defaultValue: field.defaultValue })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder={field.placeholder}
                />
            </div>
        )
    },
    properties: [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'placeholder', label: 'Placeholder', type: 'text' },
        { key: 'min', label: 'Minimum', type: 'number' },
        { key: 'max', label: 'Maximum', type: 'number' },
        { key: 'step', label: 'Step', type: 'number' },
        { key: 'defaultValue', label: 'Default Value', type: 'number' },
    ],
    validation: [requiredRule, minValueRule, maxValueRule, integerOnlyRule, positiveOnlyRule, notEqualRule, oneOfRule]
}