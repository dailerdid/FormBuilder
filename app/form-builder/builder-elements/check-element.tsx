import { FormElement } from "../builder-types/element-types"
import { CheckField } from "../builder-types/form-types"


export const CheckElement: FormElement<CheckField> = {
    type: 'check',

    construct: (id) => ({
        id: id,
        type: 'check',
        name: `check_${id}`,
        label: 'Check',
        defaultChecked: false,
        validation: [],
    }),

    component: (field, value, onChange) => {
        return (
            <div className="text-background">
                <p>{field.label}</p>
                <input type="checkbox"></input>
            </div>
        )
    },
    properties: [
        {
            key: 'label',
            label: 'Type somtnig...',
            type: 'check',
        }
    ]
}
