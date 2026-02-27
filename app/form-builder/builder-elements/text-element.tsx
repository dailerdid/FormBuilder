import { FormElement } from "../builder-types/element-types"
import { TextField } from "../builder-types/form-types"


export const TextElement: FormElement<TextField> = {
    type: 'text',

    construct: (id) => ({
        id: id,
        type: 'text',
        name: `text_${id}`,
        validation: [],
        placeholder: 'Type something...'
    }),

    component: (field, value, onChange) => {
        return (
            <div>
                <p>{value}</p>
                <input onChange={onChange} placeholder={field.placeholder}></input>
            </div>
        )
    },
    properties: [
        {
            key: 'placeholder',
            label: 'Placeholder',
            type: 'text',
        },
    ]
}
