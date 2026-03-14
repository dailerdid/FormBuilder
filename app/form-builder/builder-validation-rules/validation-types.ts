export type NumberValidation = 'minValue' | 'maxValue' | 'integerOnly' | 'positiveOnly' | 'fileMaxSize' | 'fileMinSize' | 'fileCountMax' | 'minSelected' | 'maxSelected'

export type TextValidation = 'minLength' | 'maxLength' | 'pattern' | 'emailFormat' | 'urlFormat' | 'phoneFormat' | 'dateMin' | 'dateMax' | 'dateRange' | 'fileType' | 'notEqual' | 'oneOf'

export type CommonValidation = 'required' | 'mustBeTrue'

export type ValidationTypes = NumberValidation | TextValidation | CommonValidation

export type Fieldstypes = 'text' | 'number'

export type ValidationConfig = {
    errorMessage: string,
    value: unknown
    compareValue?: unknown
    type: ValidationTypes
}

export type ValidationField<TConfig extends ValidationConfig> = {
    type: Fieldstypes,
    key: Extract<keyof TConfig, string>
    label: string
}

export type Validation = {
    label: string,
    type: ValidationTypes,
    validate(value: unknown, obj: ValidationConfig): boolean,
    component(): React.ReactElement,
    construct(obj: ValidationConfig): ValidationConfig,
    fields: ValidationField<ValidationConfig>[],
}




