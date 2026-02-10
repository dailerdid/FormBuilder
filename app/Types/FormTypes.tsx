
export type BaseField = {
  id: string;
  type: string;
  name: string;
  validation: {}[];
}

export type Form = {
  id: string,
  title: string,
  fields: BaseField[]
}


export type TextField = BaseField & {
  type: 'text' | 'email' | 'password';
  placeholder: string;
}

export type SelectField = BaseField & {
  type: 'select';
  options: { label: string; value: string }[]
}

export type ToggleField = BaseField & {
  type: 'toggle';
  defaultChecked: boolean;
}
