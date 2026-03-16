import { useEffect, useMemo, useState } from "react"
import { FormElementInputProps } from "../builder-types/element-types"
import { RangeField } from "../builder-types/form-types"
import { normalizeElementInputProps } from "../builder-types/element-types"

const rangeValueResolvers = [
    (value: FormElementInputProps['value']) => typeof value === 'number' ? value : null,
    (value: FormElementInputProps['value']) => typeof value === 'string' && value !== '' ? Number(value) : null,
]

const getResolvedRangeValue = (value: FormElementInputProps['value'], defaultValue: number) => {
    return rangeValueResolvers.reduce<number | null>(
        (resolvedValue, resolveValue) => resolvedValue ?? resolveValue(value),
        null,
    ) ?? defaultValue
}

const getRangeBackground = (progress: number) => `linear-gradient(to right, #22c55e 0%, #22c55e ${progress}%, #ef4444 ${progress}%, #ef4444 100%)`

const getRangeProgress = (value: number, min: number, max: number) => {
    const rangeSpan = Math.max(max - min, 1)
    return Math.min(Math.max(((value - min) / rangeSpan) * 100, 0), 100)
}

const RangeValueBadge = ({ value }: { value: number }) => (
    <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
        {value}
    </span>
)

const RangeBounds = ({ min, max }: { min: number, max: number }) => (
    <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
    </div>
)

type RangeLogicProps = {
    field: RangeField
    inputProps?: FormElementInputProps | unknown
    onChange?: (value: FormElementInputProps['value']) => void
}

export const RangeLogic = ({ field, inputProps, onChange }: RangeLogicProps) => {
    const { value, onChange: registerOnChange, ...registerProps } = normalizeElementInputProps(inputProps, onChange)
    const initialValue = getResolvedRangeValue(value, field.defaultValue)
    const [currentValue, setCurrentValue] = useState(initialValue)

    useEffect(() => {
        setCurrentValue(getResolvedRangeValue(value, field.defaultValue))
    }, [field.defaultValue, value])

    const safeMin = Number(field.min)
    const safeMax = Number(field.max)
    const progress = useMemo(() => getRangeProgress(currentValue, safeMin, safeMax), [currentValue, safeMin, safeMax])

    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-medium leading-none text-foreground">
                    {field.label}
                </label>
                <RangeValueBadge value={currentValue} />
            </div>

            <input
                {...registerProps}
                type="range"
                min={field.min}
                max={field.max}
                step={field.step}
                aria-label={field.label}
                className="range-slider h-2 w-full cursor-pointer appearance-none rounded-lg"
                style={{
                    background: getRangeBackground(progress)
                }}
                value={currentValue}
                onChange={(event) => {
                    setCurrentValue(Number(event.target.value))
                    registerOnChange?.(event)
                }}
            />

            <RangeBounds min={field.min} max={field.max} />
        </div>
    )
}