import { useEffect, useState } from "react"


type OptionsType = {
    options?: { id: string, label: string, value: string }[],
    onChange: (options: OptionsType['options']) => void,
}

export const OptionsCreator = ({ options, onChange }: OptionsType) => {



    const [optionsList, setOptionsList] = useState(options ? options : [])

    const deleteOpt = (id: string) => {
        const newList = optionsList.filter(e => e.id !== id)
        setOptionsList(newList)
        onChange(newList)
    }

    const createOpt = () => {
        const opt = { id: Math.random().toString(), label: `Option ${optionsList.length + 1} `, value: `option${optionsList.length + 1}` }
        const newList = [...optionsList, opt]
        setOptionsList(newList)
        onChange(newList)
    }

    const changes = (id: string, type: "label" | "value", event: string) => {
        const newList = optionsList.map((e) => {
            if (id === e.id) {
                return { ...e, [type]: event }
            }
            return e
        })
        setOptionsList(newList)
        onChange(newList)
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Options</label>
                <button 
                    onClick={() => createOpt()}
                    className="inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-border bg-background hover:bg-muted hover:text-foreground h-7 px-2 shadow-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Add
                </button>
            </div>
            
            <div className="flex flex-col gap-2">
                {optionsList.length === 0 && (
                    <div className="text-xs text-muted-foreground text-center py-2">No options</div>
                )}
                {optionsList.map((e) => (
                    <div key={e.id} className="flex items-center gap-2 group">
                        <div className="flex-1 flex flex-col gap-1">
                            <input 
                                className="flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                onChange={(event) => changes(e.id, 'label', event.target.value)} 
                                value={e.label}
                                placeholder="Label"
                            />
                            <input 
                                className="flex h-8 w-full rounded-md border border-input bg-muted px-2 py-1 text-xs text-muted-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                onChange={(event) => changes(e.id, 'value', event.target.value)} 
                                value={e.value}
                                placeholder="Value"
                            />
                        </div>
                        <button
                            onClick={() => deleteOpt(e.id)}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-destructive/10 hover:text-destructive h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100"
                            title="Remove option"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
