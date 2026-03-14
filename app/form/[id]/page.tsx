'use client'

import { StoreState, submitFormData } from "@/app/form-builder/builder-store/store"
import { CheckElement } from "@/app/form-builder/builder-elements/check-element"
import { DateElement } from "@/app/form-builder/builder-elements/date-element"
import { EmailElement } from "@/app/form-builder/builder-elements/email-element"
import { FileElement } from "@/app/form-builder/builder-elements/file-element"
import { NumberElement } from "@/app/form-builder/builder-elements/numeric-element"
import { PasswordElement } from "@/app/form-builder/builder-elements/password-element"
import { RadioGroupElement } from "@/app/form-builder/builder-elements/radio-group-element"
import { RangeElement } from "@/app/form-builder/builder-elements/range-element"
import { SelectElement } from "@/app/form-builder/builder-elements/select-element"
import { TelElement } from "@/app/form-builder/builder-elements/tel-element"
import { TextareaElement } from "@/app/form-builder/builder-elements/text-area-element"
import { TextElement } from "@/app/form-builder/builder-elements/text-element"
import { validationRegistry } from "@/app/form-builder/builder-validation-rules/validation-regisrty"
import { FieldsType, SubmittedFile } from "@/app/form-builder/builder-types/form-types"
import { useParams } from "next/navigation"
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"



type FormValues = Record<string, unknown>
type SubmittedField = {
    type: FieldsType['type']
    label: string
    value: unknown
}

type SubmittedFormData = Record<string, SubmittedField>

const getFormFieldKey = (field: FieldsType) => field.name.replaceAll('.', '_')
const getTelCountryFieldKey = (field: FieldsType) => `${getFormFieldKey(field)}__countryCode`

const validateFieldValue = (field: FieldsType, value: unknown) => {
    for (const validation of field.validation) {
        const validator = validationRegistry[validation.type]

        if (!validator.validate(value, validation)) {
            return validation.errorMessage
        }
    }

    return true
}

const createRegisterOptions = (field: FieldsType): RegisterOptions<FormValues, string> => ({
    validate: (value) => validateFieldValue(field, value),
    ...(['range', 'number'].includes(field.type) ? { valueAsNumber: true } : {})
})

const readFileAsDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '')
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
})

const serializeFileValue = async (value: unknown): Promise<SubmittedFile[]> => {
    const fileList = typeof FileList !== 'undefined' && value instanceof FileList
        ? Array.from(value)
        : []

    return Promise.all(fileList.map(async (file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        dataUrl: await readFileAsDataUrl(file),
    })))
}

const buildSubmittedFormData = async (fields: FieldsType[], values: FormValues): Promise<SubmittedFormData> => {
    const entries = await Promise.all(fields.map(async (field) => {
        const rawValue = values[getFormFieldKey(field)]
        const value = field.type === 'tel'
            ? `${String(values[getTelCountryFieldKey(field)] ?? field.defaultCountryCode ?? '').trim()} ${String(rawValue ?? '').trim()}`.trim()
            : field.type === 'file'
                ? await serializeFileValue(rawValue)
                : rawValue

        return [field.id, {
            type: field.type,
            label: field.label,
            value
        }] as const
    }))

    return Object.fromEntries(entries)
}

const renderField = (
    field: FieldsType,
    register: ReturnType<typeof useForm<FormValues>>['register'],
    disabled: boolean,
) => {
    const registerProps = {
        ...register(getFormFieldKey(field), createRegisterOptions(field)),
        disabled,
    }

    switch (field.type) {
        case 'text':
            return TextElement.component(field, registerProps)
        case 'email':
            return EmailElement.component(field, registerProps)
        case 'password':
            return PasswordElement.component(field, registerProps)
        case 'check':
            return CheckElement.component(field, registerProps)
        case 'select':
            return SelectElement.component(field, registerProps)
        case 'textarea':
            return TextareaElement.component(field, registerProps)
        case 'number':
            return NumberElement.component(field, registerProps)
        case 'radio-group':
            return RadioGroupElement.component(field, registerProps)
        case 'date':
            return DateElement.component(field, registerProps)
        case 'file':
            return FileElement.component(field, registerProps)
        case 'range':
            return RangeElement.component(field, registerProps)
        case 'tel':
            return TelElement.component(field, {
                ...registerProps,
                selectProps: {
                    ...register(getTelCountryFieldKey(field)),
                    disabled,
                }
            })
    }
}


export default function Data() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false)
    const formsState = useSelector((state: StoreState) => state.form.forms[id as string])
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        if (!formsState || isSubmittedSuccessfully) {
            return
        }
        const formData = await buildSubmittedFormData(formsState.fields, values)

        dispatch(submitFormData({ data: formData, formID: id as string }))
        setIsSubmittedSuccessfully(true)
    }

    if (!formsState) {
        return (
            <div className="min-h-screen bg-muted flex items-center justify-center text-foreground transition-colors duration-200">
                <div className="text-muted-foreground text-sm flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Loading form...
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-muted/30 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative transition-colors duration-200 overflow-y-auto">
            <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none"></div>
            
            <div className={`max-w-2xl w-full z-10 space-y-8 bg-background p-10 rounded-xl shadow-sm border border-border transition-all duration-300 ${isSubmittedSuccessfully ? 'pointer-events-none opacity-60 grayscale-[0.5]' : ''}`}>
                <div className="border-b border-border pb-6">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                        {formsState.title || "Untitled Form"}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Please provide the requested information below.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                        {formsState.fields.map((e) => {
                            return (
                                <div
                                    key={e.id}
                                    className="relative flex items-start transition-all"
                                >
                                    <div className="flex-1 w-full">
                                        {renderField(e, register, isSubmittedSuccessfully)}
                                        {errors[getFormFieldKey(e)]?.message && (
                                            <p className="mt-2 text-xs font-medium text-destructive">
                                                {String(errors[getFormFieldKey(e)]?.message)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="pt-6 border-t border-border">
                        <button
                            type="submit"
                            disabled={isSubmittedSuccessfully}
                            className="w-full flex justify-center py-2.5 px-4 rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring focus:ring-offset-background transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmittedSuccessfully ? 'Form successfully submitted' : 'Submit Form'}
                        </button>
                    </div>
                </form>
            </div>

            {isSubmittedSuccessfully && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                        </div>
                        <h3 className="mt-4 text-2xl font-bold text-gray-900">Thank you!</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Your form has been submitted successfully. Resubmission is not available.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )

}

