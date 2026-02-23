import { FormElement } from "@/app/Types/ElementTypes";
import { TextField } from "@/app/Types/FormTypes";


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
