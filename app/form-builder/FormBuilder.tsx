'use client'

import { useState } from "react"
import { ElementProperties } from "./builder-element-properties/element-properties"
import { ElementsList } from "./builder-elements-list/elements-list"
import { store, addField, reorderFields, insertFieldAtIndex } from "./builder-store/store"
import { Renderer } from "./builder-renderer/renderer"
import { BuilderContextProvider } from "./form-builder-context/builder-context"
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, Active, useSensor, useSensors, PointerSensor } from "@dnd-kit/core"
import { elementsKeys, registry } from "@/app/registry"
import { FieldsType } from "./builder-types/form-types"


export interface BuilderType {
  id: string,
}


export const FormBuilder = ({ id }: BuilderType) => {
  const [activeDragItem, setActiveDragItem] = useState<Active | null>(null)

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  const sensors = useSensors(pointerSensor);

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
      const payload = registry[type as elementsKeys].construct(Math.random().toString());

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
              {(() => {
                const key = activeDragItem.data.current?.type as elementsKeys;
                const entry = registry[key];
                if (!entry) return null;
                return (entry as any).component(entry.construct('temp'), '', () => { });
              })()}
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
