import { BaseField } from "./FormTypes";



export type FormElementComponents = {
  value: any,
  onChange: (val: any) => void

}

export type PropertyConfig<T> = | { type: 'text'; key: keyof T; label: string }
  | { type: 'check'; key: keyof T; label: string }
  | { type: 'select'; key: keyof T; label: string; options: { label: string; value: string }[] }
  | { type: 'options-control'; key: keyof T; label: string; value: string }

export type FormElement<T extends BaseField> = {
  type: T['type'],
  construct: (id: string) => T,
  component: (field: T, value: any, onChange: (value: any) => void) => any,
  properties: PropertyConfig<T>[]
}
