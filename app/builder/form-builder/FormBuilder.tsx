'use client'

import { Provider } from "react-redux"
import { useEffect, useState } from "react"
import { ElementProperties } from "./builder-element-properties/element-properties"
import { ElementsList } from "./builder-elements-list/elements-list"
import { store } from "./builder-store/store"
import { Switch } from "./components/switch"
import { Renderer } from "./builder-renderer/renderer"
import { Dashboard } from "./Dashboard"


export const FormBuilder = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className="flex flex-col h-full w-full bg-muted text-foreground font-sans overflow-hidden transition-colors duration-200">
      <header className="flex items-center justify-between px-6 py-3 bg-background border-b border-border z-10 shrink-0 transition-colors duration-200">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary-foreground"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>
          </div>
          <h1 className="text-sm font-semibold tracking-tight">Form Builder</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 mr-2">
            <span className="text-xs font-medium text-muted-foreground">Dark Mode</span>
            <Switch checked={isDark} onCheckedChange={setIsDark} />
          </div>
          <div className="h-6 w-px bg-border mx-1"></div>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-border bg-background hover:bg-muted hover:text-foreground h-9 px-4 py-2 shadow-sm">
            Preview
          </button>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:opacity-90 h-9 px-4 py-2 shadow-sm">
            Publish
          </button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <ElementsList />
        <Renderer />
        <ElementProperties />
        <Dashboard />
      </div>
    </div>
  )
}
