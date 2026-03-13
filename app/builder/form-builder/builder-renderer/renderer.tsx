'use client'

import { useDispatch, useSelector } from "react-redux"
import { selectActiveForm, editButton, removeField, StoreState } from "../builder-store/store"
import { registry } from "@/app/registry"


export const Renderer = () => {
    const activeForm = useSelector(selectActiveForm)
    const edit = activeForm.editing
    const dispatch = useDispatch()

    return (
        <main className="flex-1 bg-muted/30 overflow-y-auto flex justify-center relative transition-colors duration-200">

            <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none"></div>

            <div className="w-full max-w-3xl bg-background border-x border-border shadow-sm min-h-full flex flex-col relative z-10 transition-colors duration-200">

                <div className="p-8 border-b border-border/50">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">Untitled Form</h2>
                    <p className="text-sm text-muted-foreground mt-1">Please fill out the fields below.</p>
                </div>


                <div className="flex-1 p-8 flex flex-col gap-6">
                    {activeForm.fields.length === 0 && (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground/70 border-2 border-dashed border-border rounded-lg min-h-[200px] bg-muted/30">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                            <p className="text-sm font-medium text-muted-foreground">No fields added yet</p>
                            <p className="text-xs mt-1">Click elements from the sidebar to add them</p>
                        </div>
                    )}
                    {activeForm.fields.map((e) => {
                        const isEditing = edit?.id === e.id;
                        return (
                            <div
                                key={e.id}
                                onClick={() => dispatch(editButton(e))}
                                className={`group relative flex items-start p-4 -mx-4 rounded-lg transition-all cursor-pointer border border-transparent ${isEditing
                                    ? "bg-muted border-border ring-1 ring-ring shadow-sm"
                                    : "hover:bg-muted/50 hover:border-border"
                                    }`}
                            >
                                <div className="flex-1">
                                    {registry[e.type] ? registry[e.type].component(e, '', () => { }) : `Unknown element: ${e.type}`}
                                </div>

                                <div className={`absolute right-2 top-2 flex items-center gap-1 opacity-0 transition-opacity ${isEditing ? 'opacity-100' : 'group-hover:opacity-100'}`}>
                                    <button
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-background hover:text-foreground h-8 w-8 text-muted-foreground shadow-sm border border-transparent hover:border-border"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            dispatch(removeField(e));
                                        }}
                                        title="Delete field"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    )

}
