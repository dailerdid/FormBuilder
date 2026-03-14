import { FormElement, normalizeElementInputProps } from "../builder-types/element-types"
import { DateField } from "../builder-types/form-types"
import { dateMaxRule } from "../builder-validation-rules/validation-dateMax"
import { dateMinRule } from "../builder-validation-rules/validation-dateMin"
import { dateRangeRule } from "../builder-validation-rules/validation-dateRange"
import { notEqualRule } from "../builder-validation-rules/validation-notEqual"
import { requiredRule } from "../builder-validation-rules/validation-required"

export const DateElement: FormElement<DateField> = {
    type: 'date',

    construct: (id) => ({
        id,
        type: 'date',
        name: `date_${id}`,
        label: 'Date',
        validation: [],
        minDate: '',
        maxDate: '',
    }),

    component: (field, inputProps, onChange) => {
        const { value, ...registerProps } = normalizeElementInputProps(inputProps, onChange)

        return (
            <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium leading-none text-foreground">
                    {field.label}
                </label>
                <input
                    {...registerProps}
                    type="date"
                    min={field.minDate || undefined}
                    max={field.maxDate || undefined}
                    value={typeof value === 'string' ? value : undefined}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
        )
    },
    properties: [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'minDate', label: 'Min Date', type: 'text' },
        { key: 'maxDate', label: 'Max Date', type: 'text' },
    ],
    validation: [requiredRule, dateMinRule, dateMaxRule, dateRangeRule, notEqualRule]
}