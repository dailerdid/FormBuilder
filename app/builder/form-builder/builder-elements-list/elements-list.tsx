import { registry } from "@/app/registry"
import { useDispatch, useSelector } from "react-redux"
import { addField, addForm, StoreState } from "../builder-store/store"
import { FormState } from "../builder-types/form-types";


export const ElementsList = () => {
    const currentForm = useSelector((state: FormState) => state.forms);
    const dispatch = useDispatch()

    return (
        <aside className="w-64 flex-shrink-0 bg-background border-r border-border flex flex-col z-10 transition-colors duration-200">
            <div className="p-4 border-b border-border">
                <h2 className="text-sm font-semibold text-foreground">Elements</h2>
                <button onClick={() => dispatch(addForm(currentForm))} className="text-xs text-muted-foreground mt-1">Click to add to your form.</button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                    {Object.entries(registry).map(([key, value]) => (
                        <button
                            key={key}
                            className="inline-flex flex-col items-center justify-center gap-2 rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-border bg-background hover:bg-muted hover:text-foreground h-20 px-4 py-2 shadow-sm"
                            onClick={() => dispatch(addField(value.construct(Math.random().toString())))}
                        >
                            {key === 'text' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" /></svg>}
                            {key === 'select' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><path d="m9 16 3-3 3 3" /></svg>}
                            {key === 'check' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>}
                            {key === 'email' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>}

                            {key === 'password' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>}

                            {!['text', 'select', 'check', 'email', 'password'].includes(key) && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /></svg>}

                            <span className="capitalize text-foreground">{key}</span>
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    )
}
