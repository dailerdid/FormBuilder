'use client'

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editButton, removeField, StoreState } from "../builder-store/store"
import { registry } from "@/app/registry"
import { useBuilder } from "../form-builder-context/builder-context"
import { FieldsType, FieldType } from "../builder-types/form-types"
import { useDroppable, useDndMonitor } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"



export type GhostField = { id: string; type: FieldType; isGhost: true; index: number }
export type DisplayField = FieldsType | GhostField



export const SortableField = ({ e, id, isEditing }: { e: FieldsType, id: string, isEditing: boolean }) => {
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
            className={`group relative flex items-start p-4 -mx-4 rounded-xl transition-all duration-150 cursor-pointer border ${isEditing
                ? "bg-primary/5 border-primary/20 shadow-sm"
                : "border-transparent hover:bg-muted/50 hover:border-border"
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
                {registry[e.type] ? (registry[e.type] as any).component(e, '', () => { }) : `Unknown element: ${e.type}`}
            </div>
            <div className={`absolute right-2 top-2 flex items-center gap-1 opacity-0 transition-opacity ${isEditing ? 'opacity-100' : 'group-hover:opacity-100'}`}>
                <button
                    className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-destructive/10 hover:text-destructive h-7 w-7 text-muted-foreground border border-transparent hover:border-destructive/20"
                    onClick={(event) => {
                        event.stopPropagation();
                        dispatch(removeField({ data: e, formId: id }));
                    }}
                    title="Delete field"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                </button>
            </div>
        </div>
    );
};

export const GhostDroppable = ({ e, index }: { e: FieldsType, index: number }) => {
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
            className="group relative flex items-start p-4 -mx-4 rounded-xl bg-primary/5 border-2 border-primary/30 border-dashed opacity-70 transition-all pointer-events-none"
        >
            <div className="flex-1">
                {registry[e.type] ? (registry[e.type] as any).component(e, '', () => { }) : `Unknown`}
            </div>
        </div>
    );
};


export const useRendererDnd = (fields: FieldsType[]) => {
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const [activeSidebarElementType, setActiveSidebarElementType] = useState<FieldType | null>(null);

    const { setNodeRef } = useDroppable({
        id: 'renderer-area',
        data: {
            isDesignerDropArea: true,
        },
    });

    const handleDragOver = (over: any) => {
        if (!over?.id || over.id === 'ghost-element') return;

        const isRendererDrop = over.id === 'renderer-area';
        const targetIndex = fields.findIndex((f: any) => f.id === over.id);
        const resolvedIndex = isRendererDrop || targetIndex === -1 ? fields.length : targetIndex;

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

    const displayFields: DisplayField[] = fields ? [...fields] : [];
    if (activeSidebarElementType && dragOverIndex !== null && dragOverIndex >= 0 && dragOverIndex <= displayFields.length) {
        displayFields.splice(dragOverIndex, 0, {
            id: 'ghost-element',
            type: activeSidebarElementType,
            isGhost: true,
            index: dragOverIndex,
        });
    }

    return { setNodeRef, displayFields };
}