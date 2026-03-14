import { ValidationConfig } from "../builder-validation-rules/validation-types";

export type FieldOption = {
  id: string;
  label: string;
  value: string;
}

export type FieldType = 'text' | 'select' | 'check' | 'email' | 'password' | 'range' | 'tel'
  | 'textarea' | 'number' | 'radio-group' | 'date' | 'file'

export type BaseField = {
  id: string;
  type: FieldType;
  name: string;
  validation: ValidationConfig[]
}

export type Form = {
  id: string,
  title: string,
  fields: FieldsType[],
  editing: null | string,
}

export type FormState = {
  forms: Record<string, Form>,
  submitData: {
    [id: string]: { [key: string]: any }[]
  }
}

export type SubmittedFile = {
  name: string
  size: number
  type: string
  dataUrl: string
}

export type FieldsType = TextField | SelectField | CheckField | EmailField | PasswordField | RangeField | TelField | TextareaField | NumberField | RadioGroupField | DateField | FileField

export type TextField = BaseField & {
  type: 'text';
  label: string;
  placeholder: string;
}

export type EmailField = BaseField & {
  type: 'email';
  label: string;
  placeholder: string;
}

export type PasswordField = BaseField & {
  type: 'password';
  label: string;
  placeholder: string;
}

export type SelectField = BaseField & {
  label: string;
  type: 'select';
  options: FieldOption[]
}

export type CheckField = BaseField & {
  type: 'check';
  label: string;
  defaultChecked: boolean;
}

export type RangeField = BaseField & {
  type: 'range';
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export type TelField = BaseField & {
  type: 'tel';
  label: string;
  placeholder: string;
  countryCodes: FieldOption[];
  defaultCountryCode: string;
}

export type TextareaField = BaseField & {
  type: 'textarea';
  label: string;
  placeholder: string;
  rows: number;
}

export type NumberField = BaseField & {
  type: 'number';
  label: string;
  placeholder: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export type RadioGroupField = BaseField & {
  type: 'radio-group';
  label: string;
  options: FieldOption[];
}

export type DateField = BaseField & {
  type: 'date';
  label: string;
  minDate: string;
  maxDate: string;
}

export type FileField = BaseField & {
  type: 'file';
  label: string;
  accept: string;
  multiple: boolean;
}

