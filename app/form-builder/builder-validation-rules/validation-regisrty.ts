import { dateMaxRule } from "./validation-dateMax";
import { dateMinRule } from "./validation-dateMin";
import { dateRangeRule } from "./validation-dateRange";
import { emailFormatRule } from "./validation-emailFormat";
import { fileCountMaxRule } from "./validation-fileCountMax";
import { fileMaxSizeRule } from "./validation-fileMaxSize";
import { fileMinSizeRule } from "./validation-fileMinSize";
import { fileTypeRule } from "./validation-fileType";
import { integerOnlyRule } from "./validation-integerOnly";
import { maxLengthRule } from "./validation-maxLen";
import { maxValueRule } from "./validation-maxVal";
import { maxSelectedRule } from "./validation-maxSelected";
import { minLengthRule } from "./validation-minLen";
import { minValueRule } from "./validation-minVal";
import { minSelectedRule } from "./validation-minSelected";
import { mustBeTrueRule } from "./validation-mustBeTrue";
import { notEqualRule } from "./validation-notEqual";
import { oneOfRule } from "./validation-oneOf";
import { patternRule } from "./validation-pattern";
import { phoneFormatRule } from "./validation-phoneFormat";
import { positiveOnlyRule } from "./validation-positiveOnly";
import { requiredRule } from "./validation-required";
import { urlFormatRule } from "./validation-urlFormat";

export const validationRegistry = {
    dateMax: dateMaxRule,
    dateMin: dateMinRule,
    dateRange: dateRangeRule,
    emailFormat: emailFormatRule,
    fileCountMax: fileCountMaxRule,
    fileMaxSize: fileMaxSizeRule,
    fileMinSize: fileMinSizeRule,
    fileType: fileTypeRule,
    integerOnly: integerOnlyRule,
    minValue: minValueRule,
    maxValue: maxValueRule,
    maxSelected: maxSelectedRule,
    minLength: minLengthRule,
    minSelected: minSelectedRule,
    maxLength: maxLengthRule,
    mustBeTrue: mustBeTrueRule,
    notEqual: notEqualRule,
    oneOf: oneOfRule,
    pattern: patternRule,
    phoneFormat: phoneFormatRule,
    positiveOnly: positiveOnlyRule,
    required: requiredRule,
    urlFormat: urlFormatRule,
}

export type validationKeys = keyof typeof validationRegistry
export type ValidationDefinition = (typeof validationRegistry)[validationKeys]
