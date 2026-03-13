'use client'

import { Provider } from "react-redux"
import { useEffect, useState } from "react"
import { ElementProperties } from "./builder-element-properties/element-properties"
import { ElementsList } from "./builder-elements-list/elements-list"
import { store, addField, reorderFields, insertFieldAtIndex } from "./builder-store/store"
import { Switch } from "./components/switch"
import { Renderer } from "./builder-renderer/renderer"
import { Dashboard } from "./Dashboard"
import { BuilderContextProvider } from "./form-builder-context/builder-context"
import Link from "next/link"
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, Active, useSensor, useSensors, PointerSensor } from "@dnd-kit/core"
import { registry } from "@/app/registry"


export interface BuilderType {
  id: string,
}


export const FormBuilder = ({ id }: BuilderType) => {
  const [isDark, setIsDark] = useState(false)
  const [activeDragItem, setActiveDragItem] = useState<Active | null>(null)

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  const sensors = useSensors(pointerSensor);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragItem(event.active)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragItem(null);
    const { active, over } = event;
    if (!over) return;

    const { isDesignerElement, isSidebarElement, type } = active.data.current || {};

    if (isDesignerElement) {
       return store.dispatch(reorderFields({ activeId: String(active.id), overId: String(over.id), formId: id }));
    }

    if (isSidebarElement) {
        const payload = registry[type as string].construct(Math.random().toString());
        
        const overIndex = over.id === 'ghost-element' 
            ? over.data?.current?.index 
            : store.getState().form.forms[id]?.fields.findIndex((f: any) => f.id === over.id);

        const isValidIndex = typeof overIndex === 'number' && overIndex !== -1 && over.id !== 'renderer-area';

        store.dispatch(isValidIndex 
            ? insertFieldAtIndex({ data: payload, index: overIndex, formId: id }) 
            : addField({ data: payload, formID: id })
        );
    }
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
    <BuilderContextProvider id={id}>
      <div className="flex flex-col h-full w-full bg-muted text-foreground font-sans overflow-hidden transition-colors duration-200">
        <header className="flex items-center justify-between px-6 py-3 bg-background border-b border-border z-10 shrink-0 transition-colors duration-200">
          <div className="flex items-center gap-3">
            <Link href={'/'} className="flex items-center gap-3 text-sm font-semibold tracking-tight">
              <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary-foreground"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>
              </div>
              Form Builder</Link>
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
        </div>
      </div>
    </BuilderContextProvider>
    <DragOverlay>
      {activeDragItem && !activeDragItem.data.current?.isDesignerElement ? (
        <div 
            className="group relative flex items-start p-4 rounded-lg cursor-grabbing transition-transform bg-background border border-border ring-1 ring-ring shadow-xl opacity-90 scale-105"
            style={{ width: 600 }}
        >
          <div className="flex-1 pointer-events-none w-full">
            {registry[activeDragItem.data.current?.type as string]?.component(
              registry[activeDragItem.data.current?.type as string]?.construct('temp'),
              '',
              () => {}
            )}
          </div>
        </div>
      ) : null}
    </DragOverlay>
    </DndContext>
  )
}
