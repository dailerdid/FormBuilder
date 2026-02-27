
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
  necessarily: string[],
}

export type FieldsType = TextField | SelectField | CheckField

export type TextField = BaseField & {
  type: 'text' | 'email' | 'password';
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
