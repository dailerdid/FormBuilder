import { maxLengthRule } from "./validation-maxLen";
import { maxValueRule } from "./validation-maxVal";
import { minLengthRule } from "./validation-minLen";
import { minValueRule } from "./validation-minVal";
import { requiredRule } from "./validation-required";

export const validationRegistry = {
    minValue: minValueRule,
    maxValue: maxValueRule,
    minLength: minLengthRule,
    maxLength: maxLengthRule,
    required: requiredRule,
}

export type validationKeys = keyof typeof validationRegistry
export type ValidationDefinition = (typeof validationRegistry)[validationKeys]
