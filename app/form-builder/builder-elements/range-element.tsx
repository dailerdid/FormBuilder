import { RangeLogic } from "@/app/form-builder/components/range-logic"
import { FormElement } from "../builder-types/element-types"
import { RangeField } from "../builder-types/form-types"
import { integerOnlyRule } from "../builder-validation-rules/validation-integerOnly"
import { maxValueRule } from "../builder-validation-rules/validation-maxVal"
import { minValueRule } from "../builder-validation-rules/validation-minVal"
import { positiveOnlyRule } from "../builder-validation-rules/validation-positiveOnly"
import { requiredRule } from "../builder-validation-rules/validation-required"


export const RangeElement: FormElement<RangeField> = {
    type: 'range',

    construct: (id) => ({
        id,
        type: 'range',
        name: `range_${id}`,
        label: 'Range',
        validation: [],
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
    }),

    component: (field, inputProps, onChange) => <RangeLogic field={field} inputProps={inputProps} onChange={onChange} />,

    properties: [
        {
            key: 'label',
            label: 'Label',
            type: 'text',
        },
        {
            key: 'min',
            label: 'Minimum',
            type: 'number',
        },
        {
            key: 'max',
            label: 'Maximum',
            type: 'number',
        },
        {
            key: 'step',
            label: 'Step',
            type: 'number',
        },
        {
            key: 'defaultValue',
            label: 'Default Value',
            type: 'number',
        },
    ],
    validation: [requiredRule, minValueRule, maxValueRule, integerOnlyRule, positiveOnlyRule]
}