import type { ChangeEvent, ReactElement } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Validation } from "../builder-validation-rules/validation-types";
import { BaseField } from "./form-types";

type SupportedInputElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

export type FormElementValue = string | number | boolean | FileList | null | undefined

export type FormElementChangeEvent = ChangeEvent<SupportedInputElement> | {
  target: {
    name?: string
    value: string
    checked?: boolean
    files?: FileList | null
    type?: string
  }
  currentTarget: {
    name?: string
    value: string
    checked?: boolean
    files?: FileList | null
    type?: string
  }
  type: 'change'
}

export type FormElementChangeHandler = (event: FormElementChangeEvent) => void | Promise<boolean | void>

export type FormElementSelectProps = Omit<Partial<UseFormRegisterReturn>, 'onChange' | 'onBlur'> & {
  disabled?: boolean
  onChange?: FormElementChangeHandler
  onBlur?: FormElementChangeHandler
}

const hasTargetValue = (value: unknown): value is { target: { value?: FormElementValue, checked?: boolean } } => {
  return typeof value === 'object' && value !== null && 'target' in value
}

const getEventValue = (event: FormElementChangeEvent): FormElementValue => {
  const target = event.target
  if ('files' in target && target.files) {
    return target.files.length > 0 ? target.files : undefined
  }
  return 'checked' in target && typeof target.checked === 'boolean'
    ? target.checked
    : target.value
}


export type FormElementComponents = {
  value: FormElementValue | FileList | null,
  onChange: (val: FormElementValue | FileList | null) => void

}

export type FormElementInputProps = Omit<Partial<UseFormRegisterReturn>, 'onChange'> & {
  value?: FormElementValue | FileList | null,
  checked?: boolean,
  onChange?: FormElementChangeHandler,
  selectProps?: FormElementSelectProps,
}

export const normalizeElementInputProps = (
  inputProps?: FormElementInputProps | unknown,
  onChange?: (value: FormElementValue | FileList | null) => void,
) : FormElementInputProps => {
  if (inputProps && typeof inputProps === 'object' && !Array.isArray(inputProps)) {
    return inputProps as FormElementInputProps
  }

  return {
    value: inputProps as FormElementInputProps['value'],
    onChange: onChange
      ? (event) => onChange(hasTargetValue(event) ? getEventValue(event) : undefined)
      : undefined,
  }
}

export type PropertyConfig<T> = | { type: 'text'; key: keyof T; label: string }
  | { type: 'number'; key: keyof T; label: string }
  | { type: 'check'; key: keyof T; label: string }
  | { type: 'select'; key: keyof T; label: string; options: { label: string; value: string }[] }
  | { type: 'options-control'; key: keyof T; label: string; value: string }

export type FormElement<T extends BaseField> = {
  type: T['type'],
  construct: (id: string) => T,
  component: (field: T, inputProps?: FormElementInputProps | unknown, onChange?: (value: FormElementInputProps['value']) => void) => ReactElement,
  properties: PropertyConfig<T>[],
  validation: Validation[]
}
