'use client'

import { usePathname } from "next/navigation"
import Link from 'next/link'
import { ThemeToggle } from "./theme-toggle"

export const AppShell = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const isPublicForm = pathname?.startsWith('/form/')

    if (isPublicForm) {
        return <div className="min-h-screen bg-background text-foreground transition-colors duration-200">{children}</div>
    }

    const title = pathname?.startsWith('/builder') ? 'Builder' : pathname?.startsWith('/data') ? 'Submissions' : 'Dashboard'

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground transition-colors duration-200">
            <header className="flex items-center justify-between px-6 py-3 bg-background border-b border-border z-10 shrink-0 select-none">
                <div className="flex items-center gap-4">
                    <Link href={'/'} className="flex items-center gap-3 text-sm font-semibold tracking-tight hover:opacity-80 transition-opacity">
                        <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center shadow-sm text-primary-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>
                        </div>
                        <span className="hidden sm:inline">Form Builder</span>
                    </Link>
                    <div className="h-4 w-px bg-border hidden sm:block"></div>
                    <span className="text-sm text-muted-foreground hidden sm:inline">{title}</span>
                </div>
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                </div>
            </header>
            <main className="flex-1 overflow-hidden relative">
                {children}
            </main>
        </div>
    )
}
