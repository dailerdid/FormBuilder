import type { UseFormRegisterReturn } from "react-hook-form";
import { Validation } from "../builder-validation-rules/validation-types";
import { BaseField } from "./form-types";



export type FormElementComponents = {
  value: any,
  onChange: (val: any) => void

}

export type FormElementInputProps = Partial<UseFormRegisterReturn> & {
  value?: unknown,
  checked?: boolean,
  onChange?: (event: any) => void
}

export const normalizeElementInputProps = (
  inputProps?: FormElementInputProps | unknown,
  onChange?: (value: any) => void,
) : FormElementInputProps => {
  if (inputProps && typeof inputProps === 'object' && !Array.isArray(inputProps)) {
    return inputProps as FormElementInputProps
  }

  return {
    value: inputProps,
    onChange,
  }
}

export type PropertyConfig<T> = | { type: 'text'; key: keyof T; label: string }
  | { type: 'check'; key: keyof T; label: string }
  | { type: 'select'; key: keyof T; label: string; options: { label: string; value: string }[] }
  | { type: 'options-control'; key: keyof T; label: string; value: string }

export type FormElement<T extends BaseField> = {
  type: T['type'],
  construct: (id: string) => T,
  component: (field: T, inputProps?: FormElementInputProps | unknown, onChange?: (value: any) => void) => any,
  properties: PropertyConfig<T>[],
  validation: Validation[]
}
