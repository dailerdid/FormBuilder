'use client'

import { SubmissionValue } from "@/app/data/components/submission-value"
import { StoreState } from "@/app/form-builder/builder-store/store"
import { useSelector } from "react-redux"
import { useParams } from "next/navigation"

export default function Data() {
    const { id } = useParams()

    const allData = useSelector((state: StoreState) => state.form.submitData)
    const submitedData = id && typeof id === "string" && allData[id] ? allData[id] : []
    const currentForm = useSelector((state: StoreState) => id && typeof id === "string" ? state.form.forms[id] : undefined)

    // Track unique fields by ID to handle label changes and schema modifications
    const fieldMap = new Map<string, string>() // fieldId -> label

    // First, add all fields from current form schema to preserve order and ensure new (unsubmitted) fields are shown
    if (currentForm?.fields) {
        currentForm.fields.forEach((field) => {
            fieldMap.set(field.id, field.label || field.name || field.id)
        })
    }

    // Then, add any fields from past submissions (in case they were removed from the schema)
    submitedData.forEach((submission) => {
        Object.entries(submission).forEach(([fieldId, fieldData]: [string, any]) => {
            if (fieldData && typeof fieldData === 'object' && !fieldMap.has(fieldId)) {
                fieldMap.set(fieldId, fieldData.label || fieldId)
            }
        })
    })
    
    // Array of column objects mapped for the table
    const columns = Array.from(fieldMap.entries()).map(([colId, label]) => ({ colId, label }))

    return (
        <div className="min-h-full h-full bg-muted/30 p-6 md:p-8 text-foreground transition-colors duration-200 overflow-y-auto w-full flex justify-center relative">
            
            <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none"></div>

            <div className="max-w-6xl w-full z-10 flex flex-col gap-6">
                <header className="bg-background p-6 md:p-8 rounded-xl shadow-sm border border-border flex justify-between items-center transition-colors duration-200">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Form Submissions</h1>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Tracking incoming responses for form ID: <span className="font-mono text-xs text-foreground bg-muted px-2 py-1 rounded-md ml-1">{id}</span>
                        </p>
                    </div>
                </header>

                {submitedData.length === 0 ? (
                    <div className="bg-background rounded-xl shadow-sm p-12 text-center border border-border flex flex-col items-center justify-center min-h-[300px] transition-colors duration-200">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted border border-border mb-4 text-muted-foreground">
                            <svg className="w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-medium text-foreground mb-1">No data yet</h2>
                        <p className="text-muted-foreground text-sm">Responses will appear here once users start submitting.</p>
                    </div>
                ) : (
                    <div className="bg-background rounded-xl shadow-sm border border-border overflow-hidden transition-all duration-300">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-semibold tracking-wider">
                                            #
                                        </th>
                                        {columns.map(col => (
                                            <th key={col.colId} scope="col" className="px-6 py-4 font-semibold tracking-wider">
                                                {col.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {submitedData.map((submission, index) => {
                                        return (
                                            <tr key={index} className="border-b border-border hover:bg-muted/30 transition-colors last:border-0">
                                                <td className="px-6 py-4 font-medium text-foreground">
                                                    {index + 1}
                                                </td>
                                                {columns.map(col => {
                                                    const fieldData = (submission as any)[col.colId]
                                                    const value = fieldData && typeof fieldData === 'object'
                                                        ? fieldData.value
                                                        : undefined
                                                    
                                                    return (
                                                        <td key={col.colId} className="px-6 py-4 text-muted-foreground">
                                                            <SubmissionValue value={value} />
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
