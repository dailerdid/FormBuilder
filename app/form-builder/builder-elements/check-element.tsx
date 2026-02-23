import { FormElement } from "../builder-types/element-types"
import { CheckField } from "../builder-types/form-types"


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
