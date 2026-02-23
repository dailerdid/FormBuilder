import { FormElement } from "@/app/Types/ElementTypes";
import { CheckField } from "@/app/Types/FormTypes";


export const CheckElement: FormElement<CheckField> = {
    type: 'check',

    construct: (id) => ({
        id: id,
        type: 'check',
        name: `check_${id}`,
        label: '',
        defaultChecked: false,
        validation: [],
    }),

    component: (field, value, onChange) => {
        return (
            <div>
                <label>{value}</label>
                <input type="checkbox"></input>
            </div>
        )
    },
    properties: [
        {
            key: 'label',
            label: 'width',
            type: 'check',
        }
    ]
}
