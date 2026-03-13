'use client'

import { StoreState, submitFormData } from "@/app/form-builder/builder-store/store"
import { CheckElement } from "@/app/form-builder/builder-elements/check-element"
import { EmailElement } from "@/app/form-builder/builder-elements/email-element"
import { PasswordElement } from "@/app/form-builder/builder-elements/password-element"
import { SelectElement } from "@/app/form-builder/builder-elements/select-element"
import { TextElement } from "@/app/form-builder/builder-elements/text-element"
import { validationRegistry } from "@/app/form-builder/builder-validation-rules/validation-regisrty"
import { FieldsType } from "@/app/form-builder/builder-types/form-types"
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
    validate: (value) => validateFieldValue(field, value)
})

const buildSubmittedFormData = (fields: FieldsType[], values: FormValues): SubmittedFormData => {
    return fields.reduce<SubmittedFormData>((acc, field) => {
        acc[field.id] = {
            type: field.type,
            label: field.label,
            value: values[getFormFieldKey(field)]
        }

        return acc
    }, {})
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

    const onSubmit: SubmitHandler<FormValues> = (values) => {
        if (!formsState || isSubmittedSuccessfully) {
            return
        }
        const formData = buildSubmittedFormData(formsState.fields, values)

        dispatch(submitFormData({ data: formData, formID: id as string }))
        setIsSubmittedSuccessfully(true)
    }

    if (!formsState) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-500 text-lg animate-pulse">Loading form...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative">
            <div className={`max-w-2xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100 transition-opacity ${isSubmittedSuccessfully ? 'pointer-events-none opacity-50 select-none' : ''}`}>
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Please provide the requested information below.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-5">
                        {formsState.fields.map((e) => {
                            return (
                                <div
                                    key={e.id}
                                    className="relative flex items-start transition-all"
                                >
                                    <div className="flex-1 w-full">
                                        {renderField(e, register, isSubmittedSuccessfully)}
                                        {errors[getFormFieldKey(e)]?.message && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {String(errors[getFormFieldKey(e)]?.message)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmittedSuccessfully}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                            {isSubmittedSuccessfully ? 'Form submitted' : 'Submit Form'}
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
                        <h3 className="mt-4 text-2xl font-bold text-gray-900">Спасибо!</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Ваша форма успешно отправлена. Повторное заполнение и отправка недоступны.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )

}

