
export type BaseField = {
  id: string;
  type: string;
  name: string;
  validation: {}[];
}

export type Form = {
  id: string,
  title: string,
  fields: FieldsType[],
  editing: null | string,
}

export type FormState = {
  forms: Record<string, Form>,
  activeFormId: string
}

export type FieldsType = TextField | SelectField | CheckField | EmailField | PasswordField

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
  options: { id: string; label: string; value: string }[]
}

export type CheckField = BaseField & {
  type: 'check';
  label: string;
  defaultChecked: boolean;
}
