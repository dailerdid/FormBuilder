import { useEffect, useRef, useState } from "react"
import { FormElementChangeEvent, FormElementInputProps } from "../builder-types/element-types"

export type SelectLogicOption = {
    id?: string
    label: string
    value: string
}

type SelectLogicProps = {
    options?: SelectLogicOption[]
    value?: unknown
    defaultValue?: string
    placeholder?: string
    inputProps?: Omit<FormElementInputProps, 'value' | 'checked' | 'selectProps'> | FormElementInputProps['selectProps']
    minWidthClassName?: string
}

const createSyntheticEvent = (name: string | undefined, value: string): FormElementChangeEvent => ({
    target: { name, value },
    currentTarget: { name, value },
    type: 'change',
})

const getOptions = (options?: SelectLogicOption[]) => options ?? []

const getResolvedDefaultValue = (options: SelectLogicOption[], defaultValue?: string) => defaultValue ?? options[0]?.value ?? ''

const getResolvedValue = (value: unknown, fallbackValue: string) => typeof value === 'string' ? value : fallbackValue

const getSelectedLabel = (options: SelectLogicOption[], selectedValue: string, placeholder: string) => options.find((option) => option.value === selectedValue)?.label ?? placeholder

const getChevronClassName = (isOpen: boolean) => [
    'shrink-0 origin-center transition-transform duration-200',
    isOpen ? 'rotate-180' : 'rotate-0'
].join(' ')

const getContainerClassName = (minWidthClassName?: string) => [
    'relative',
    minWidthClassName ?? ''
].join(' ').trim()

const getOptionsContainerClassName = (isOpen: boolean) => [
    'absolute left-0 right-0 top-[calc(100%+0.25rem)] z-20 max-h-64 overflow-y-auto rounded-md border border-border bg-background p-1 shadow-lg',
    isOpen ? 'block' : 'hidden'
].join(' ')

const getOptionClassName = (isSelected: boolean) => [
    'flex w-full items-center rounded-sm px-3 py-2 text-left text-sm transition-colors',
    isSelected ? 'bg-muted text-foreground' : 'text-foreground hover:bg-muted/70'
].join(' ')

const useDropdownDismiss = (
    containerRef: React.RefObject<HTMLDivElement | null>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    useEffect(() => {
        const handlePointerDown = (event: MouseEvent) => {
            const shouldClose = !containerRef.current?.contains(event.target as Node)
            setIsOpen((prev) => shouldClose ? false : prev)
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            setIsOpen((prev) => event.key === 'Escape' ? false : prev)
        }

        document.addEventListener('mousedown', handlePointerDown)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('mousedown', handlePointerDown)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [containerRef, setIsOpen])
}

const SelectOptionsList = ({
    isOpen,
    options,
    selectedValue,
    onSelect,
}: {
    isOpen: boolean
    options: SelectLogicOption[]
    selectedValue: string
    onSelect: (value: string) => void
}) => (
    <div className={getOptionsContainerClassName(isOpen)}>
        {options.map((option) => (
            <button
                key={option.id ?? option.value}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => onSelect(option.value)}
                className={getOptionClassName(option.value === selectedValue)}
            >
                {option.label}
            </button>
        ))}
    </div>
)

export const SelectLogic = ({
    options: optionsProp,
    value,
    defaultValue,
    placeholder = 'Select an option',
    inputProps,
    minWidthClassName,
}: SelectLogicProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const options = getOptions(optionsProp)
    const fallbackValue = getResolvedDefaultValue(options, defaultValue)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(getResolvedValue(value, fallbackValue))

    useDropdownDismiss(containerRef, setIsOpen)

    useEffect(() => {
        setSelectedValue(getResolvedValue(value, fallbackValue))
    }, [value, fallbackValue])

    const handleSelect = (nextValue: string) => {
        setSelectedValue(nextValue)
        setIsOpen(false)
        inputProps?.onChange?.(createSyntheticEvent(inputProps.name, nextValue))
        inputProps?.onBlur?.(createSyntheticEvent(inputProps.name, nextValue))
    }

    return (
        <div ref={containerRef} className={getContainerClassName(minWidthClassName)}>
            <input
                type="hidden"
                name={inputProps?.name}
                ref={inputProps?.ref}
                value={selectedValue}
                readOnly
                disabled={inputProps?.disabled}
            />

            <button
                type="button"
                disabled={inputProps?.disabled}
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex h-10 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <span className="truncate text-left">{getSelectedLabel(options, selectedValue, placeholder)}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={getChevronClassName(isOpen)}>
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            <SelectOptionsList
                isOpen={isOpen}
                options={options}
                selectedValue={selectedValue}
                onSelect={handleSelect}
            />
        </div>
    )
}