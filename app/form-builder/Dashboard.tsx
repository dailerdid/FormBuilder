import { useDispatch, useSelector } from "react-redux"
import { addForm, removeForm, StoreState } from "./builder-store/store"
import { ChangeEventHandler, ReactElement, useState } from "react"
import Link from "next/link"
import { useBuilder } from "./form-builder-context/builder-context"
import { registry } from "../registry"
import { FieldsType } from "./builder-types/form-types"


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
    <div className="flex h-screen w-full bg-background text-foreground font-sans overflow-hidden transition-colors duration-200">
      <aside className="w-80 bg-background border-r border-border flex flex-col z-10 transition-colors duration-200">
        <div className="p-4 border-b border-border bg-background">
          <div className="flex gap-2">
            <input
              value={title}
              onChange={onChange}
              placeholder="Form title"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none bg-primary text-primary-foreground hover:opacity-90 h-9 w-9 shadow-sm"
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
                  ? "bg-muted border-border ring-1 ring-ring shadow-sm"
                  : "hover:bg-muted/50 border-transparent hover:border-border"
                  }`}
              >
                <div className="flex flex-col min-w-0">
                  <span className={`font-medium truncate text-sm ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {value.title || "Untitled Form"}
                  </span>
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
                    className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                    title="Delete Form"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                  </button>
                </div>
              </div>
            )
          })}

          {forms.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground text-sm">
              <p>No forms yet.</p>
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative bg-muted/30 transition-colors duration-200">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none"></div>

        {preview ? (
          <div className="h-full flex flex-col p-8 z-10 overflow-y-auto w-full items-center">
            <div className="w-full max-w-3xl bg-background border border-border shadow-sm rounded-xl min-h-[500px] flex flex-col relative transition-colors duration-200">
              <div className="p-8 border-b border-border">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">{formsState[preview]?.title || "Untitled Form"}</h2>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/builder/${preview}`} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-border bg-background hover:bg-muted hover:text-foreground h-9 px-4 py-2 shadow-sm gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" /><path d="m15 5 3 3" /></svg>
                      Edit
                    </Link>
                    <Link href={`/data/${preview}`} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-border bg-background hover:bg-muted hover:text-foreground h-9 px-4 py-2 shadow-sm gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" /></svg>
                      Responses
                    </Link>
                    <Link href={`/form/${preview}`} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-border bg-background hover:bg-muted hover:text-foreground h-9 px-4 py-2 shadow-sm gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                      Open Form
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col gap-6 w-full">
                {activeForm?.fields && activeForm.fields.length > 0 ? (
                  <div className="space-y-6 pointer-events-none opacity-60 grayscale-[0.2] select-none transition-all">
                    {activeForm.fields.map((e: FieldsType) => (
                      <div key={e.id} className="relative">
                        {registry[e.type]
                          ? registry[e.type].component(e as any, '', () => { })
                          : <div className="p-4 bg-destructive/10 text-destructive rounded border border-destructive/20 text-sm">Unknown element: {e.type}</div>
                        }
                      </div>
                    ))}
                    <div className="pt-4 border-t border-border">
                      <button disabled className="w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-md font-medium text-sm opacity-50">
                        Submit
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col gap-4 text-muted-foreground/50 justify-center items-center h-full min-h-[220px]">
                    <p className="text-sm text-muted-foreground">No fields added.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground z-10">
            <p className="text-sm">Select a form to preview it.</p>
          </div>
        )}
      </main>
    </div>
  )
}
