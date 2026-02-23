import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FieldsType, Form } from "../builder-types/form-types";



const formInitialState: Form = {
    id: Math.random().toString(),
    title: 'initialForm',
    fields: [],
    editing: null,
}

export const FormSlice = createSlice({
    name: 'Form',
    initialState: formInitialState,
    reducers: {
        addField: (state: Form, action: PayloadAction<FieldsType>) => {
            return { ...state, fields: [...state.fields, action.payload] }
        },
        removeField: (state: Form, action: PayloadAction<FieldsType>) => {
            const newState = state.fields.filter(item => item.id !== action.payload.id)
            return { ...state, fields: newState }
        },
        editFiled: (state: Form, action: PayloadAction<{ key: string, value: any }>) => {
            const store = { ...state }
            const edit = store.editing
            return {
                ...store, fields: store.fields.map((e) => {
                    if (e.id == edit) {
                        return { ...e, [action.payload.key]: action.payload.value }
                    }
                    return e
                })
            }
        },
        editButton: (state: Form, action: PayloadAction<FieldsType>) => {
            return { ...state, editing: action.payload.id }
        }
    }
})

export const { addField, removeField, editFiled, editButton } = FormSlice.actions
const FormReducers = FormSlice.reducer
export type StoreState = ReturnType<typeof store.getState>

export const store = configureStore({
    reducer: {
        form: FormReducers
    }
})

