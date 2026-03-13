export type NumberValidation = 'minValue' | 'maxValue'

export type TextValidation = 'minLength' | 'maxLength'

export type CommonValidation = 'required'

export type ValidationTypes = NumberValidation | TextValidation | CommonValidation

export type Fieldstypes = 'text' | 'number'

export type ValidationConfig = {
    errorMessage: string,
    value: unknown
    type: ValidationTypes
}

export type ValidationField<TConfig extends ValidationConfig> = {
    type: Fieldstypes,
    key: Extract<keyof TConfig, string>
}

export type Validation = {
    label: string,
    type: ValidationTypes,
    validate(value: unknown, obj: ValidationConfig): boolean,
    component(): React.ReactElement,
    construct(obj: ValidationConfig): ValidationConfig,
    fields: ValidationField<ValidationConfig>[],
}




