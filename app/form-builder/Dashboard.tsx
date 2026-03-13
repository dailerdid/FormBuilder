import { useDispatch, useSelector } from "react-redux"
import { addForm, removeForm, StoreState } from "./builder-store/store"
import { ChangeEventHandler, useState } from "react"
import Link from "next/link"
import { useBuilder } from "./form-builder-context/builder-context"
import { registry } from "../registry"


export const Dashboard = () => {
  const [preview, setPreview] = useState('')
  const [title, setTitle] = useState('')
  const onChange = (event: any) => {
    setTitle(event.target.value)
  }

  const { id } = useBuilder()
  const dispatch = useDispatch()
  const formsState = useSelector((state: StoreState) => state.form.forms)
  const activeForm = useSelector((state: StoreState) => state.form.forms[preview])
  const forms = Object.entries(formsState)

  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900 font-sans overflow-hidden">
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Form Builder</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your forms</p>
        </div>

        <div className="p-4 bg-gray-50/50 border-b border-gray-100">
          <div className="flex gap-2">
            <input
              value={title}
              onChange={onChange}
              placeholder="New Form Title..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all bg-white shadow-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && title) {
                  dispatch(addForm({ title }))
                  setTitle('')
                }
              }}
            />
            <button
              onClick={() => {
                if (title) {
                  dispatch(addForm({ title }))
                  setTitle('')
                }
              }}
              className="bg-black hover:bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors shadow-sm flex items-center justify-center aspect-square"
              title="Create Form"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {forms.map(([key, value]) => {
            const isActive = preview === value.id;
            return (
              <div
                key={value.id}
                onClick={() => setPreview(value.id)}
                className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 border ${isActive
                  ? "bg-gray-100 border-gray-200 shadow-sm"
                  : "hover:bg-gray-50 border-transparent hover:border-gray-100"
                  }`}
              >
                <div className="flex flex-col min-w-0">
                  <span className={`font-medium truncate ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                    {value.title || "Untitled Form"}
                  </span>
                  <span className="text-xs text-gray-400 truncate">ID: {value.id.slice(0, 8)}...</span>
                </div>

                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Are you sure you want to delete this form?')) {
                        dispatch(removeForm(value));
                        if (preview === value.id) setPreview('');
                      }
                    }}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete Form"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                  </button>
                </div>
              </div>
            )
          })}

          {forms.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400 text-sm italic">
              <p>No forms created yet.</p>
              <p className="text-xs mt-1">Create one to get started.</p>
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50/50 relative">
        {activeForm ? (
          <>
            <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between shadow-sm z-10 shrink-0">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{activeForm.title}</h2>
                <div className="text-xs text-gray-500 flex gap-2 items-center mt-0.5">
                  <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase">Active</span>
                  <span>{activeForm.fields.length} elements</span>
                </div>
              </div>
              <Link
                href={`/builder/${activeForm.id}`}
                className="group flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Edit Form</span>
                <svg className="transition-transform group-hover:translate-x-0.5" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
              </Link>
            </header>

            <div className="flex-1 overflow-y-auto p-8 lg:p-12 flex flex-col items-center">
              <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col min-h-[400px]">
                <div className="h-32 w-full bg-[linear-gradient(45deg,#6366f1,#a855f7,#ec4899,#6366f1)] animate-gradient relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
                </div>

                <div className="flex-1 p-8 md:p-10 space-y-6 -mt-8 relative z-10 bg-white rounded-t-3xl mx-4 shadow-sm">
                  <div className="border-b border-gray-100 pb-6 mb-6">
                    <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600 mb-3">Preview Mode</div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{activeForm.title}</h1>
                    <p className="text-gray-500 mt-2">Please complete the form below.</p>
                  </div>
                  <Link
                    href={`/form/${activeForm.id}`}
                    className="group flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <span>Edit Form</span>
                    <svg className="transition-transform group-hover:translate-x-0.5" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                  </Link>

                  {activeForm.fields.map((e) => (
                    <div key={e.id} className="relative transition-all">
                      <Link href={`/data/${activeForm.id}`}>Click Me</Link>
                      <div className="pointer-events-none opacity-90">
                        {registry[e.type]
                          ? registry[e.type].component(e, '', () => { })
                          : <div className="p-4 bg-red-50 text-red-500 rounded border border-red-100 text-sm">Unknown element: {e.type}</div>
                        }
                      </div>
                    </div>
                  ))}

                  {activeForm.fields.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-400 border-2 border-dashed border-gray-100 rounded-lg bg-gray-50/50">
                      <svg className="mx-auto mb-2 opacity-50" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="12" y1="8" x2="12" y2="16" /></svg>
                      <p className="font-medium">Form is empty</p>
                      <p className="text-xs mt-1">Open Editor to add fields</p>
                    </div>
                  )}

                  {activeForm.fields.length > 0 && (
                    <div className="pt-6 mt-8 border-t border-gray-100">
                      <button disabled className="w-full py-2.5 bg-gray-900 text-white rounded-lg font-medium text-sm opacity-90 cursor-not-allowed shadow-md">
                        Submit Form
                      </button>
                      <p className="text-center text-xs text-gray-400 mt-3">Button disabled in preview</p>
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-8 text-gray-400 text-xs font-medium uppercase tracking-widest opacity-60">Design Preview</p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
            <div className="w-20 h-20 bg-white shadow-lg rounded-2xl flex items-center justify-center mb-6 transform -rotate-3 border border-gray-100">
              <svg className="text-gray-400" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">No Form Selected</h3>
            <p className="text-gray-500 max-w-sm mt-2 text-sm leading-relaxed">Select a form from the sidebar to see its preview, or create a brand new one to get started building.</p>
          </div>
        )}
      </main>
    </div>
  )
}
