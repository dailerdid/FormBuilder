# Form Builder

A drag-and-drop form builder built with Next.js, Redux Toolkit, and TypeScript. Create forms visually, customize fields and validation, preview and submit — all client-side.

## Features

- **Visual drag-and-drop builder** — add, reorder, and remove fields on a live canvas using dnd-kit
- **12 field types** — text, email, password, number, select, checkbox, radio group, textarea, range, tel, date, file
- **23 validation rules** — required, min/max length, min/max value, regex pattern, email/URL/phone format, file type/size, date range, and more
- **Registry-based architecture** — every element is a self-contained unit (component, constructor, properties config, validation list) registered in a single map, making it straightforward to add new field types
- **Form submissions viewer** — submit forms and browse response data in a table view
- **Dark / light theme** — toggle between themes with system preference detection
- **Persistent state** — forms and submissions are saved to localStorage via redux-persist, no backend required

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| State | Redux Toolkit + redux-persist |
| Forms | react-hook-form |
| Drag & Drop | dnd-kit |
| Styling | Tailwind CSS 4 |

## Getting Started

```bash
git clone <repo-url>
cd form-builder
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
├── page.tsx                        # Dashboard — create, list, preview forms
├── registry.ts                     # Element registry (single source of truth for all field types)
├── builder/[id]/page.tsx           # Builder editor page
├── form/[id]/page.tsx              # Public form page (fill & submit)
├── data/[id]/page.tsx              # Submissions viewer
├── components/                     # App shell, theme toggle, theme provider
└── form-builder/
    ├── FormBuilder.tsx             # Builder layout with DnD context
    ├── Dashboard.tsx               # Form management dashboard
    ├── builder-elements/           # Field type definitions (12 elements)
    ├── builder-elements-list/      # Sidebar element palette
    ├── builder-renderer/           # Canvas that renders the form being built
    ├── builder-element-properties/ # Properties panel for the selected field
    ├── builder-store/              # Redux store, slices, persist config
    ├── builder-types/              # TypeScript types for fields and forms
    ├── builder-validation-rules/   # 23 validation rules + validation registry
    ├── builder-dnd/                # DnD helper utilities
    ├── form-builder-context/       # React context for builder instance ID
    └── components/                 # Shared builder components (options creator, switch, etc.)
```

## Architecture

### Element Registry

Each field type is a `FormElement<T>` object that bundles everything the builder needs:

```ts
type FormElement<T extends BaseField> = {
  type: T['type']
  construct: (id: string) => T             // creates a default field instance
  component: (field: T, ...) => ReactElement // renders the field
  properties: PropertyConfig<T>[]           // drives the properties panel
  validation: Validation[]                  // available validation rules
}
```

All elements are collected in `registry.ts`. To add a new field type, create a `FormElement` and register it — the builder, renderer, properties panel, and form page all pick it up automatically.

### Validation System

Validation rules follow the same registry pattern. Each rule defines its own `validate` function, config constructor, and UI fields. Rules are attached per-element and evaluated at submission time via react-hook-form's `validate` option.

### State Management

A single Redux slice manages all forms, fields, and submissions. redux-persist writes state to localStorage so everything survives page reloads. The store is intentionally client-side — no backend, no API.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |
