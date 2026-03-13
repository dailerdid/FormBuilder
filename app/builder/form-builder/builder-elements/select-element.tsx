import { FormElement } from "../builder-types/element-types"
import { SelectField } from "../builder-types/form-types"


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

    component: (field, value, onChange) => {
        return (
            <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    {field.label}
                </label>
                <select 
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={onChange} 
                    value={value as string || ''}
                >
                    <option value="" disabled>Select an option</option>
                    {field.options?.map((e) => <option key={e.value} value={e.value}>{e.label}</option>)}
                </select>
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
    ]
}
