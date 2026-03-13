import { registry } from "@/app/registry"
import { useDispatch, useSelector } from "react-redux"
import { selectActiveForm, editField, StoreState } from "../builder-store/store"
import { OptionsCreator } from "../components/options-creator"
import { createSelector } from "@reduxjs/toolkit"


export const ElementProperties = () => {



    const activeForm = useSelector(selectActiveForm)
    const field = useSelector((state: StoreState) => state.form.forms[activeForm.id])
    const dispatch = useDispatch()
    const activeField = activeForm.fields.find(e => e.id === activeForm.editing)

    return (
        <aside className="w-80 flex-shrink-0 bg-background border-l border-border flex flex-col z-10 transition-colors duration-200">
            <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">Properties</h2>
                {activeForm.fields && <span className="text-[10px] font-medium px-2 py-0.5 bg-muted text-muted-foreground rounded-full uppercase tracking-wider">{field.type}</span>}
            </div>

            <div className="p-4 flex-1 overflow-y-auto">
                {!activeForm.fields && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground space-y-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/50"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                        <p className="text-sm">Select an element on the canvas<br />to edit its properties</p>
                    </div>
                )}

                {field.editing && field.fields && registry[activeField?.type] && (
                    <div className="flex flex-col gap-5">
                        {registry[activeField.type].properties.map((properties) => {
                            if (properties.type === 'text') {
                                return (
                                    <div key={properties.key} className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">{properties.label}</label>
                                        <input
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            onChange={(event) => {
                                                const value = event.target.value
                                                dispatch(editField({ key: properties.key, value }))
                                            }}
                                            placeholder="Enter text..."
                                        ></input>
                                    </div>
                                )
                            }
                            if (properties.type === 'select') {
                                return (
                                    <div key={properties.key} className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">{properties.label}</label>
                                        <select
                                            className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            onChange={(event) => {
                                                const value = event.target.value
                                                dispatch(editField({ key: properties.key, value }))
                                            }}
                                        >
                                            {properties.options?.map((i: any) => <option key={i.value} value={i.value}>{i.label}</option>)}
                                        </select>
                                    </div>
                                )
                            }
                            if (properties.type === 'check') {
                                return (
                                    <div key={properties.key} className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">Check Label</label>
                                        <input
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            onChange={(event) => {
                                                const value = event.target.value
                                                dispatch(editField({ key: properties.key, value }))
                                            }}
                                            placeholder={properties.label}
                                        />
                                    </div>
                                )
                            }
                            if (properties.type === 'options-control') {
                                return (
                                    <div key={properties.key} className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">{properties.label || 'Options'}</label>
                                        <div className="p-3 border border-border rounded-md bg-muted/50">
                                            <OptionsCreator onChange={(event) => {
                                                dispatch(editField({ key: properties.key, value: event }))
                                            }} />
                                        </div>
                                    </div>
                                )
                            }
                            return null
                        })}
                    </div>
                )}
            </div>
        </aside>
    )
}
