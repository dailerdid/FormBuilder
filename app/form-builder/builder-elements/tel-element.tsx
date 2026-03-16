import { SelectLogic } from "@/app/form-builder/components/select-logic"
import { FormElement, normalizeElementInputProps } from "../builder-types/element-types"
import { TelField } from "../builder-types/form-types"
import { maxLengthRule } from "../builder-validation-rules/validation-maxLen"
import { minLengthRule } from "../builder-validation-rules/validation-minLen"
import { patternRule } from "../builder-validation-rules/validation-pattern"
import { phoneFormatRule } from "../builder-validation-rules/validation-phoneFormat"
import { requiredRule } from "../builder-validation-rules/validation-required"

const defaultCountryCodes = [
    { id: 'ru', label: 'Russia (+7)', value: '+7' },
        { id: 'by', label: 'Belarus (+375)', value: '+375' },
    { id: 'md', label: 'Moldova (+373)', value: '+373' },
    { id: 'kz', label: 'Kazakhstan (+7)', value: '+7' },
    { id: 'uz', label: 'Uzbekistan (+998)', value: '+998' },
    { id: 'kg', label: 'Kyrgyzstan (+996)', value: '+996' },
    { id: 'tj', label: 'Tajikistan (+992)', value: '+992' },
    { id: 'tm', label: 'Turkmenistan (+993)', value: '+993' },
    { id: 'az', label: 'Azerbaijan (+994)', value: '+994' },
    { id: 'am', label: 'Armenia (+374)', value: '+374' },
    { id: 'ge', label: 'Georgia (+995)', value: '+995' },
    { id: 'cn', label: 'China (+86)', value: '+86' },
    { id: 'th', label: 'Thailand (+66)', value: '+66' },
    { id: 'vn', label: 'Vietnam (+84)', value: '+84' },
    { id: 'ae', label: 'UAE (+971)', value: '+971' },
    { id: 'tr', label: 'Turkey (+90)', value: '+90' },
    { id: 'de', label: 'Germany (+49)', value: '+49' },
    { id: 'gb', label: 'United Kingdom (+44)', value: '+44' },
    { id: 'us', label: 'United States (+1)', value: '+1' },
]

export const TelElement: FormElement<TelField> = {
    type: 'tel',

    construct: (id) => ({
        id,
        type: 'tel',
        name: `tel_${id}`,
        label: 'Phone Number',
        validation: [],
        placeholder: 'Enter phone number...',
        countryCodes: defaultCountryCodes,
        defaultCountryCode: defaultCountryCodes[0].value,
    }),

    component: (field, inputProps, onChange) => {
        const { value, selectProps, ...registerProps } = normalizeElementInputProps(inputProps, onChange)

        return (
            <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    {field.label}
                </label>

                <div className="flex items-stretch gap-2 w-full">
                    <SelectLogic
                        options={field.countryCodes}
                        inputProps={selectProps}
                        defaultValue={field.defaultCountryCode}
                        placeholder="Select country"
                        minWidthClassName="min-w-[180px]"
                    />

                    <div className="flex-1">
                        <input
                            {...registerProps}
                            type="tel"
                            value={typeof value === 'string' ? value : undefined}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder={field.placeholder}
                        />
                    </div>
                </div>
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
        {
            key: 'countryCodes',
            label: 'Country Codes',
            type: 'options-control',
            value: ''
        },
    ],
    validation: [requiredRule, minLengthRule, maxLengthRule, patternRule, phoneFormatRule]
}