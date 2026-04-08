import { registry } from "@/app/registry"
import { useDispatch, useSelector } from "react-redux"
import { addField, addForm, StoreState } from "../builder-store/store"
import { FormState } from "../builder-types/form-types";
import { useBuilder } from "../form-builder-context/builder-context";
import { useDraggable } from "@dnd-kit/core";

const elementLabels: Record<string, string> = {
    'text': 'Text',
    'email': 'Email',
    'password': 'Password',
    'number': 'Number',
    'textarea': 'Textarea',
    'select': 'Select',
    'check': 'Checkbox',
    'radio-group': 'Radio',
    'range': 'Range',
    'tel': 'Phone',
    'date': 'Date',
    'file': 'File',
}

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
                {elementKey === 'range' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>}
                {elementKey === 'tel' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.63a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.45-1.24a2 2 0 0 1 2.11-.45c.85.3 1.73.51 2.63.63A2 2 0 0 1 22 16.92z"/></svg>}
                {elementKey === 'textarea' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M17 6.1H3"/><path d="M21 12.1H3"/><path d="M15.1 18H3"/></svg>}
                {elementKey === 'number' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M4 9h16"/><path d="M4 15h16"/><path d="M10 3 8 21"/><path d="M16 3l-2 18"/></svg>}
                {elementKey === 'radio-group' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="6" cy="6" r="3"/><path d="M17 6h4"/><circle cx="6" cy="18" r="3"/><path d="M17 18h4"/></svg>}
                {elementKey === 'date' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>}
                {elementKey === 'file' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M13.234 20.252 21 12.3"/><path d="m16 6-8.414 8.414a2 2 0 0 0 2.829 2.829L19 8.657a4 4 0 1 0-5.657-5.657L4.929 11.414a6 6 0 1 0 8.485 8.485L20 13"/></svg>}
                {!['text', 'select', 'check', 'email', 'password', 'range', 'tel', 'textarea', 'number', 'radio-group', 'date', 'file'].includes(elementKey) && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /></svg>}
                <span className="text-foreground">{elementLabels[elementKey] ?? elementKey}</span>
            </button>
        </div>
    );
};

export const ElementsList = () => {
    const currentForm = useSelector((state: FormState) => state.forms);
    const dispatch = useDispatch()
    const { id } = useBuilder()

    return (
        <aside className="w-80 flex-shrink-0 bg-background border-r border-border flex flex-col z-10 transition-colors duration-200">
            <div className="p-4 border-b border-border">
                <h2 className="text-sm font-semibold text-foreground">Elements</h2>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                    {Object.entries(registry).map(([key, value]) => (
                        <DraggableSidebarElement key={key} elementKey={key} value={value} id={id} />
                    ))}
                </div>
            </div>
        </aside>
    )
}
