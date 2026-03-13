'use client'

import { StoreState } from "@/app/form-builder/builder-store/store"
import { useSelector } from "react-redux"
import { useParams } from "next/navigation"
import Link from "next/link"

export default function Data() {
    const { id } = useParams()

    const allData = useSelector((state: StoreState) => state.form.submitData)
    const submitedData = id && allData[id] ? allData[id] : []

    return (
        <div className="min-h-screen bg-slate-200 p-6 md:p-8 text-slate-900">
            <Link href={'/'}>Back to Forms</Link>
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 bg-white p-6 rounded-2xl shadow-md border border-slate-300">
                    <h1 className="text-3xl font-extrabold text-slate-900">Form Submissions</h1>
                    <p className="text-slate-600 mt-2 font-medium text-lg">
                        Tracking incoming responses for form ID: <span className="text-indigo-600 px-2 py-1 bg-indigo-50 rounded-md border border-indigo-100">{id}</span>
                    </p>
                </header>

                {submitedData.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-md p-12 text-center border-2 border-slate-300">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-100 border-2 border-slate-200 mb-6">
                            <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-700 mb-2">No data yet</h2>
                        <p className="text-slate-500 max-w-sm mx-auto text-lg">Responses will appear here once users start submitting the form.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                        {submitedData.map((e, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg border-2 border-slate-300 overflow-hidden hover:shadow-xl hover:border-indigo-400 transition-all duration-300 flex flex-col">
                                <div className="bg-slate-50 px-6 py-4 border-b-2 border-slate-200 flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white font-black text-xl shadow-md">
                                            {index + 1}
                                        </span>
                                        <h3 className="font-bold text-slate-800 text-xl">Response</h3>
                                    </div>
                                    <span className="text-sm font-bold bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-300">
                                        Received
                                    </span>
                                </div>
                                <div className="p-6 flex-grow">
                                    {Object.entries(e).map(([groupKey, value], groupIndex) => (
                                        <div key={groupKey} className={groupIndex > 0 ? "mt-6 pt-6 border-t-4 border-dashed border-slate-400" : ""}>
                                            <div className="flex flex-col divide-y-2 divide-slate-300">
                                                {Object.entries(value as Record<string, any>).map(([key, val]) => (
                                                    <div key={key} className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0">
                                                        <span className="text-sm font-black text-indigo-700 uppercase tracking-wider">
                                                            {key}
                                                        </span>
                                                        <div className="text-base text-slate-900 font-semibold bg-slate-100 px-4 py-3 rounded-xl border-2 border-slate-300 break-words hover:bg-slate-200 transition-colors shadow-inner">
                                                            {String(val) || <span className="text-slate-400 font-normal italic">Empty</span>}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
