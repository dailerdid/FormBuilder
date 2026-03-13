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
            <div className="flex items-center space-x-2 w-full py-2">
                <input 
                    type="checkbox" 
                    id={field.id}
                    className="peer h-4 w-4 shrink-0 rounded-sm border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 accent-primary"
                />
                <label 
                    htmlFor={field.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground cursor-pointer"
                >
                    {field.label}
                </label>
            </div>
        )
    },
    properties: [
        {
            key: 'label',
            label: 'Checkbox Label',
            type: 'text',
        }
    ]
}
