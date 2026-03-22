'use client'

import { useSelector } from "react-redux"
import { StoreState } from "../builder-store/store"
import { useBuilder } from "../form-builder-context/builder-context"
import { SortableField, GhostDroppable, useRendererDnd } from "../builder-dnd/dnd-helpers"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

export const Renderer = () => {

    const { id } = useBuilder()
    const activeForm = useSelector((state: StoreState) => state.form.forms[id])

    const { setNodeRef, displayFields } = useRendererDnd(activeForm?.fields ?? [])

    return (
        <main 
            ref={setNodeRef}
            className="flex-1 bg-muted/40 overflow-y-auto flex justify-center relative"
        >

            <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none"></div>

            <div className="w-full max-w-3xl bg-card border-x border-border shadow-sm min-h-full flex flex-col relative z-10">

                <div className="p-8 border-b border-border">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">Untitled Form</h2>
                    <p className="text-sm text-muted-foreground mt-1">Please fill out the fields below.</p>
                </div>


                <div className="flex-1 p-8 flex flex-col gap-6">
                    {displayFields.length === 0 && (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground/70 border-2 border-dashed border-border rounded-lg min-h-[200px] bg-muted/30">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                            <p className="text-sm font-medium text-muted-foreground">No fields added yet</p>
                            <p className="text-xs mt-1">Click elements from the sidebar to add them</p>
                        </div>
                    )}
                    {activeForm && displayFields.length > 0 && (
                        <SortableContext items={activeForm.fields.map((f: any) => f.id)} strategy={verticalListSortingStrategy}>
                            {displayFields.map((e: any, idx: number) => {
                                const isEditing = activeForm.editing === e.id;
                                if (e.isGhost) {
                                    return <GhostDroppable key="ghost-element" e={e} index={idx} />
                                }
                                return (
                                    <SortableField key={e.id} e={e} id={id} isEditing={isEditing} />
                                );
                            })}
                        </SortableContext>
                    )}
                </div>
            </div>
        </main>
    )

}
