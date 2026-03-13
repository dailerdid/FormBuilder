import { registry } from "@/app/registry"
import { useDispatch, useSelector } from "react-redux"
import { addField, addForm, StoreState } from "../builder-store/store"
import { FormState } from "../builder-types/form-types";
import { useBuilder } from "../form-builder-context/builder-context";
import { useDraggable } from "@dnd-kit/core";

export const DraggableSidebarElement = ({ elementKey, value, id }: { elementKey: string, value: any, id: string }) => {
    const dispatch = useDispatch();
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: `sidebar-${elementKey}`,
        data: {
            type: elementKey,
            isSidebarElement: true,
        },
    });

    return (
        <div 
            ref={setNodeRef}
            className={`group relative flex flex-col items-center justify-center gap-2 rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-border bg-background hover:bg-muted hover:text-foreground h-20 px-4 py-2 shadow-sm ${isDragging ? "opacity-50" : ""}`}
        >
            <div 
                {...listeners}
                {...attributes}
                className="absolute left-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
            </div>
            
            <button
                className="w-full h-full flex flex-col items-center justify-center gap-2"
                onClick={() => dispatch(addField({ data: value.construct(Math.random().toString()), formID: id }))}
            >
                {elementKey === 'text' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" /></svg>}
                {elementKey === 'select' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><path d="m9 16 3-3 3 3" /></svg>}
                {elementKey === 'check' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>}
                {elementKey === 'email' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>}
                {elementKey === 'password' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>}
                {!['text', 'select', 'check', 'email', 'password'].includes(elementKey) && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /></svg>}
                <span className="capitalize text-foreground">{elementKey}</span>
            </button>
        </div>
    );
};

export const ElementsList = () => {
    const currentForm = useSelector((state: FormState) => state.forms);
    const dispatch = useDispatch()
    const { id } = useBuilder()

    return (
        <div className="p-4 flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
                {Object.entries(registry).map(([key, value]) => (
                    <DraggableSidebarElement key={key} elementKey={key} value={value} id={id} />
                ))}
            </div>
        </div>
    )
}
