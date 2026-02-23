import { FormElement } from "@/app/Types/ElementTypes"
import { SelectField } from "@/app/Types/FormTypes"


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
            <div>
                <p>{field.label}</p>
                <select onChange={onChange} value={value}>
                    {field.options.map((e) => <option value={e.value}>{e.label}</option>)}
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
            key: 'label',
            label: 'Choose Name',
            type: 'select',
            options: [{ label: 'perviy', value: 'opt1' }, { label: 'vtoroy', value: 'opt2' }]
        },
        {
            key: 'options',
            label: 'Options',
            type: 'options-control',
            value: ''
        }

    ]
}
