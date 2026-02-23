import { FormElement } from "../builder-types/element-types"
import { TextField } from "../builder-types/form-types"


export const TextElement: FormElement<TextField> = {
    type: 'text',

    construct: (id) => ({
        id: id,
        type: 'text',
        name: `text_${id}`,
        validation: [],
        placeholder: 'ya v ahue'
    }),

    component: (field, value, onChange) => {
        return (
            <input onChange={onChange} placeholder={field.placeholder} value={value}></input>
        )
    },
    properties: [
        {
            key: 'name',
            label: 'width',
            type: 'text'
        },
    ]
}
