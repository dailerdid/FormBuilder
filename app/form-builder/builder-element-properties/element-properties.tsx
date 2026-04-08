import { registry } from "@/app/registry"
import { useDispatch, useSelector } from "react-redux"
import { editField, StoreState } from "../builder-store/store"
import { OptionsCreator } from "../components/options-creator"
import { useBuilder } from "../form-builder-context/builder-context"
import { ValidationProperties } from "../builder-validation-rules/validation-properties"


export const ElementProperties = () => {

    const { id } = useBuilder()
    const activeForm = useSelector((state: StoreState) => state.form.forms[id])
    const dispatch = useDispatch()
    const activeField = activeForm?.fields?.find(e => e.id === activeForm.editing)
    const fieldProps = activeField as Record<string, any> | undefined

    return (
        <aside className="w-80 flex-shrink-0 bg-background border-l border-border flex flex-col z-10 transition-colors duration-200">
            <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">Properties</h2>
                {activeField && <span className="text-[10px] font-medium px-2 py-0.5 bg-muted text-muted-foreground rounded-full uppercase tracking-wider">{activeField.type}</span>}
            </div>

            <div className="p-4 flex-1 overflow-y-auto w-full flex flex-col gap-6">
                {!activeField && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground min-h-[200px]">
                        <p className="text-sm">Select a field to edit its properties.</p>
                    </div>
                )}

                {activeForm?.editing && activeField && registry[activeField.type] && (
                    <div className="flex flex-col gap-5">
                        {registry[activeField.type].properties.map((properties) => {
                            if (properties.type === 'text') {
                                return (
                                    <div key={properties.key} className="space-y-2">
                                        <label className="text-sm font-medium leading-none text-foreground">{properties.label}</label>
                                        <input
                                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            onChange={(event) => {
                                                const value = event.target.value
                                                dispatch(editField({ data: { key: properties.key, value }, formId: id }))
                                            }}
                                            placeholder="Enter value"
                                            value={fieldProps?.[properties.key as string] || ""}
                                        ></input>
                                    </div>
                                )
                            }
                            if (properties.type === 'number') {
                                return (
                                    <div key={properties.key} className="space-y-2">
                                        <label className="text-sm font-medium leading-none text-foreground">{properties.label}</label>
                                        <input
                                            type="number"
                                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            onChange={(event) => {
                                                const value = event.target.value === '' ? '' : Number(event.target.value)
                                                dispatch(editField({ data: { key: properties.key, value }, formId: id }))
                                            }}
                                            value={fieldProps?.[properties.key as string] ?? ""}
                                        />
                                    </div>
                                )
                            }
                            if (properties.type === 'select') {
                                return (
                                    <div key={properties.key} className="space-y-2">
                                        <label className="text-sm font-medium leading-none text-foreground">{properties.label}</label>
                                        <div className="relative">
                                            <select
                                                className="flex h-9 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                                                onChange={(event) => {
                                                    const value = event.target.value
                                                    dispatch(editField({ data: { key: properties.key, value }, formId: id }))
                                                }}
                                                value={fieldProps?.[properties.key as string] || ""}
                                            >
                                                {properties.options?.map((i: any) => <option key={i.value} value={i.value}>{i.label}</option>)}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <svg className="h-4 w-4 text-muted-foreground opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            if (properties.type === 'check') {
                                return (
                                    <div key={properties.key} className="space-y-2">
                                        <label className="flex items-center gap-3 text-sm font-medium leading-none text-foreground">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border border-input bg-background text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            onChange={(event) => {
                                                const value = event.target.checked
                                                dispatch(editField({ data: { key: properties.key, value }, formId: id }))
                                            }}
                                            checked={Boolean(fieldProps?.[properties.key as string])}
                                        />
                                        {properties.label}
                                        </label>
                                    </div>
                                )
                            }
                            if (properties.type === 'options-control') {
                                return (
                                    <div key={properties.key} className="space-y-2">
                                        <label className="text-sm font-medium leading-none text-foreground">{properties.label || 'Options'}</label>
                                        <div className="p-3 border border-border rounded-md bg-muted/30 shadow-sm">
                                            <OptionsCreator 
                                                key={activeField.id}
                                                options={fieldProps?.[properties.key as string] || []}
                                                onChange={(event) => {
                                                    dispatch(editField({ data: { key: properties.key, value: event }, formId: id }))
                                                }} 
                                            />
                                        </div>
                                    </div>
                                )
                            }
                            return null
                        })}
                    </div>
                )}

                {activeField && (
                    <div className="pt-2 border-t border-border mt-2">
                        <ValidationProperties activeField={activeField} />
                    </div>
                )}
            </div>
        </aside>
    )
}
