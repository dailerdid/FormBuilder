import { SelectLogic } from "@/app/form-builder/components/select-logic"
import { FormElement, normalizeElementInputProps } from "../builder-types/element-types"
import { SelectField } from "../builder-types/form-types"
import { notEqualRule } from "../builder-validation-rules/validation-notEqual"
import { oneOfRule } from "../builder-validation-rules/validation-oneOf"
import { requiredRule } from "../builder-validation-rules/validation-required"


export const SelectElement: FormElement<SelectField> = {
    type: 'select',

    construct: (id) => ({
        id: id,
        label: 'Choose',
        type: 'select',
        name: `select_${id}`,
        validation: [],
        options: []
    }),

    component: (field, inputProps, onChange) => {
        const { value, ...registerProps } = normalizeElementInputProps(inputProps, onChange)

        return (
            <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    {field.label}
                </label>
                <SelectLogic
                    options={field.options}
                    value={value}
                    inputProps={registerProps}
                    defaultValue=""
                    placeholder="Select an option"
                />
            </div>
        )
    },

    properties: [
        {
            key: 'label',
            type: 'text',
            label: 'Label',
        },
        {
            key: 'options',
            label: 'Options',
            type: 'options-control',
            value: ''
        }
    ],
    validation: [requiredRule, oneOfRule, notEqualRule]
}
