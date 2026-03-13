import { FormElement } from "../builder-types/element-types"
import { EmailField } from "../builder-types/form-types"


export const EmailElement: FormElement<EmailField> = {
    type: 'email',

    construct: (id) => ({
        id: id,
        type: 'email',
        name: `email_${id}`,
        label: 'Email Address',
        validation: [],
        placeholder: 'Entering email...'
    }),

    component: (field, value, onChange) => {
        return (
            <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    {field.label}
                </label>
                <input 
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={onChange} 
                    placeholder={field.placeholder}
                    value={value as string || ''}
                />
            </div>
        )
    },
    properties: [
        {
            key: 'label',
            label: 'Label',
            type: 'text',
        },
        {
            key: 'placeholder',
            label: 'Placeholder',
            type: 'text',
        },
    ]
}
