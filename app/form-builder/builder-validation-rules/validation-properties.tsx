import { registry } from "@/app/registry"
import { validationInstructions } from "./validation-instructions"
import { validationKeys, validationRegistry } from "./validation-regisrty"
import { BaseField } from "../builder-types/form-types"
import type { ValidationConfig, ValidationField, ValidationTypes } from "./validation-types"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { addValidationRule, removeValidationRule, StoreState } from "../builder-store/store"
import { useBuilder } from "../form-builder-context/builder-context"
import { getChevronClassName } from "../components/select-logic"


export const ValidationProperties = ({ activeField }: { activeField: BaseField }) => {

  const [value, setValue] = useState<validationKeys | null>(null)
  const [expandedRules, setExpandedRules] = useState<Set<string>>(new Set())
  const dispatch = useDispatch()
  const { id } = useBuilder()
  const { register, handleSubmit, reset } = useForm<ValidationConfig>()
  const onSubmit = (e: ValidationConfig) => {
    if (!value) return;
    const selectedValidation = validationRegistry[value].construct(e)
    dispatch(addValidationRule({ data: selectedValidation, formId: id, fieldId: activeField.id }))
    setValue(null)
    reset()
  }
  const validation = useSelector((e: StoreState) => e.form.forms[id].fields)
  const currentField = validation.find((e) => e.id === activeField.id)

  const toggleExpand = (type: string) => {
    setExpandedRules((prev) => {
      const next = new Set(prev)
      if (next.has(type)) {
        next.delete(type)
      } else {
        next.add(type)
      }
      return next
    })
  }

  return (
    <div className="space-y-4 pt-4 mb-4 border-t border-border">
      <div className="space-y-2">
           <h3 className="text-sm font-medium text-foreground">Validation</h3>
           {currentField && currentField.validation.map((e) => {
             const isExpanded = expandedRules.has(e.type)
             return (
               <div className="rounded-md border border-border bg-muted/30 text-sm overflow-hidden" key={e.type}>
                 <div className="flex items-center justify-between p-2">
                   <button
                     type="button"
                     className="flex items-center gap-1.5 flex-1 min-w-0 text-left cursor-pointer"
                     onClick={() => toggleExpand(e.type)}
                   >
                     <svg
                       xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                       fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                       className={getChevronClassName(isExpanded) + ' text-muted-foreground'}
                     >
                       <path d="m6 9 6 6 6-6"/>
                     </svg>
                     <div className="flex flex-col gap-0.5 min-w-0">
                       <span className="font-medium text-xs uppercase tracking-wider text-muted-foreground">{e.type}</span>
                       <span className="text-xs text-foreground truncate max-w-[200px]">{e.errorMessage}</span>
                     </div>
                   </button>
                   <button 
                    className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors shrink-0" 
                    onClick={() => dispatch(removeValidationRule({ type: e.type, formId: id, fieldId: activeField.id }))}
                    title="Remove Rule"
                    type="button"
                   >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                   </button>
                 </div>
                 {isExpanded && (
                   <div className="px-3 pb-3 pt-1 border-t border-border space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                     <div>
                       <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Rule</span>
                       <p className="text-xs text-foreground font-medium">{validationRegistry[e.type as validationKeys]?.label ?? e.type}</p>
                       <p className="text-xs text-muted-foreground mt-0.5">{validationInstructions[e.type as ValidationTypes]}</p>
                     </div>
                     {e.value !== undefined && e.value !== null && e.value !== '' && (
                       <div>
                         <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Value</span>
                         <p className="text-xs text-foreground font-medium break-all">{String(e.value)}</p>
                       </div>
                     )}
                     <div>
                       <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Error message</span>
                       <p className="text-xs text-foreground font-medium break-all">{e.errorMessage || '—'}</p>
                     </div>
                   </div>
                 )}
               </div>
             )
           })}
      </div>

      <div className="space-y-3">
          <div className="relative">
              <select 
                className="flex h-9 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring text-muted-foreground" 
                value={value || ""} 
                onChange={(e) => {
                  setValue(e.target.value as validationKeys);
                  reset();
                }}
              >
                  <option value="" disabled>Add rule...</option>
                  {registry[activeField.type].validation.map((rules: any) => {
                  return (
                      <option key={rules.type} value={rules.type}>{rules.label}</option>
                  )
                  })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-4 w-4 text-muted-foreground opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
          </div>

          {value && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-3 bg-muted/30 border border-border rounded-md shadow-sm">
              <div className="rounded-md border border-border bg-background px-3 py-2">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {validationInstructions[value]}
                </p>
              </div>
                {validationRegistry[value].fields.map((e) => {
                if (e.type === 'text' || e.type === 'number') {
                    return (
                    <div key={e.key} className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground uppercase tracking-wider">{e.label}</label>
                        <input 
                            {...register(e.key, { required: true })} 
                      placeholder={`Enter ${e.label.toLowerCase()}...`} 
                            type={e.type}
                            className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                    </div>
                    )
                }
                return null
                })}
                <button type="submit" className="w-full inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground hover:opacity-90 h-8 shadow-sm">
                    Add Validation
                </button>
            </form>
          )}
      </div>
    </div>
  )
}
