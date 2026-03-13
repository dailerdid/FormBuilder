'use client'

import { useDispatch, useSelector } from "react-redux"
import { editButton, removeField, addField, StoreState } from "../builder-store/store"
import { registry } from "@/app/registry"
import { useBuilder } from "../form-builder-context/builder-context"
import { useState } from "react"
import { useDroppable, useDndMonitor } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableField = ({ e, id, isEditing }: { e: any, id: string, isEditing: boolean }) => {
    const dispatch = useDispatch();
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: e.id,
        data: {
            type: e.type,
            isDesignerElement: true,
            element: e,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={() => dispatch(editButton({ data: e, formId: id }))}
            className={`group relative flex items-start p-4 -mx-4 rounded-lg transition-all cursor-pointer border border-transparent ${isEditing
                ? "bg-muted border-border ring-1 ring-ring shadow-sm"
                : "hover:bg-muted/50 hover:border-border"
                } ${isDragging ? "opacity-50" : ""}`}
        >
            <div 
                {...attributes}
                {...listeners}
                className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
            </div>
            <div className="flex-1 pl-4">
                {registry[e.type] ? registry[e.type].component(e, '', () => { }) : `Unknown element: ${e.type}`}
            </div>
            <div className={`absolute right-2 top-2 flex items-center gap-1 opacity-0 transition-opacity ${isEditing ? 'opacity-100' : 'group-hover:opacity-100'}`}>
                <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-background hover:text-foreground h-8 w-8 text-muted-foreground shadow-sm border border-transparent hover:border-border"
                    onClick={(event) => {
                        event.stopPropagation();
                        dispatch(removeField({ data: e, formId: id }));
                    }}
                    title="Delete field"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                </button>
            </div>
        </div>
    );
};

export const GhostDroppable = ({ e, index }: { e: any, index: number }) => {
    const { setNodeRef } = useDroppable({
        id: 'ghost-element',
        data: {
            isGhost: true,
            index: index,
        },
    });

    return (
        <div
            ref={setNodeRef}
            className="group relative flex items-start p-4 -mx-4 rounded-lg bg-primary/10 border border-primary/50 border-dashed opacity-70 transition-all pointer-events-none"
        >
            <div className="flex-1">
                {registry[e.type] ? registry[e.type].component(e, '', () => { }) : `Unknown`}
            </div>
        </div>
    );
};

export const Renderer = () => {

    const { id } = useBuilder()
    const activeForm = useSelector((state: StoreState) => state.form.forms[id])
    const dispatch = useDispatch()

    const { setNodeRef } = useDroppable({
        id: 'renderer-area',
        data: {
            isDesignerDropArea: true,
        },
    });

    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const [activeSidebarElementType, setActiveSidebarElementType] = useState<string | null>(null);

    const handleDragOver = (over: any) => {
        if (!over?.id || over.id === 'ghost-element') return;

        const isRendererDrop = over.id === 'renderer-area';
        const targetIndex = activeForm.fields.findIndex((f: any) => f.id === over.id);
        const resolvedIndex = isRendererDrop || targetIndex === -1 ? activeForm.fields.length : targetIndex;

        setDragOverIndex((prev) => (prev === resolvedIndex ? prev : resolvedIndex));
    };

    useDndMonitor({
        onDragStart: ({ active }) => {
            if (active.data?.current?.isSidebarElement) setActiveSidebarElementType(active.data.current.type);
        },
        onDragOver: ({ active, over }) => {
            active.data?.current?.isSidebarElement ? handleDragOver(over) : setDragOverIndex((prev) => (prev === null ? prev : null));
        },
        onDragEnd: () => {
            setDragOverIndex(null);
            setActiveSidebarElementType(null);
        },
        onDragCancel: () => {
            setDragOverIndex(null);
            setActiveSidebarElementType(null);
        }
    });

    const displayFields = activeForm ? [...activeForm.fields] : [];
    if (activeSidebarElementType && dragOverIndex !== null && dragOverIndex >= 0 && dragOverIndex <= displayFields.length) {
        displayFields.splice(dragOverIndex, 0, {
            id: 'ghost-element',
            type: activeSidebarElementType,
            isGhost: true,
            index: dragOverIndex,
        });
    }

    return (
        <main 
            ref={setNodeRef}
            className="flex-1 bg-muted/30 overflow-y-auto flex justify-center relative transition-colors duration-200"
        >

            <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none"></div>

            <div className="w-full max-w-3xl bg-background border-x border-border shadow-sm min-h-full flex flex-col relative z-10 transition-colors duration-200">

                <div className="p-8 border-b border-border/50">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">Untitled Form</h2>
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
