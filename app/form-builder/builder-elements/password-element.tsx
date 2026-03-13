import { FormElement, normalizeElementInputProps } from "../builder-types/element-types"
import { PasswordField } from "../builder-types/form-types"
import { requiredRule } from "../builder-validation-rules/validation-required"


export const PasswordElement: FormElement<PasswordField> = {
    type: 'password',

    construct: (id) => ({
        id: id,
        type: 'password',
        name: `password_${id}`,
        label: 'Password',
        validation: [],
        placeholder: 'password'
    }),

    component: (field, inputProps, onChange) => {
        const { value, ...registerProps } = normalizeElementInputProps(inputProps, onChange)

        return (
            <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    {field.label}
                </label>
                <input
                    {...registerProps}
                    type="password"
                    value={typeof value === 'string' ? value : undefined}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder={field.placeholder}
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
    ],
    validation: [requiredRule]
}
