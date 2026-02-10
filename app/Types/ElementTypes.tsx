import { BaseField } from "./FormTypes";



export type FormElementComponents = {
  value: any,
  onChange: (val: any) => void
}

export type PropertyConfig<T> = | { type: 'text'; key: keyof T; label: string } | { type: 'switch'; key: keyof T; label: string } | { type: 'select'; key: keyof T; label: string; options: { label: string; value: string[] } }


export type FormElement<T extends BaseField> = {
  type: T[],
  serialize: (id: string) => T,
  component: ([]) => FormElementComponents,
  properties: PropertyConfig<T>
}
