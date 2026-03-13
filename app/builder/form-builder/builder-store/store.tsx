import { configureStore, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FieldsType, Form, FormState } from "../builder-types/form-types";
import { act } from "react";



const initialId = Math.random().toString();

const builderInitialState: Form = {
    id: initialId,
    title: 'initialForm',
    fields: [],
    editing: null,
}

const formInitialState: FormState = {
    forms: {
        [initialId]: builderInitialState
    },
    activeFormId: initialId
}


export const FormSlice = createSlice({
    name: 'Form',
    initialState: formInitialState,
    reducers: {
        addField: (state: FormState, action: PayloadAction<FieldsType>) => {
            return {
                ...state,
                forms: {
                    ...state.forms,
                    [state.activeFormId]: {
                        ...state.forms[state.activeFormId],
                        fields: [...state.forms[state.activeFormId].fields, action.payload]
                    },
                },
            };
        }, removeField: (state: FormState, action: PayloadAction<FieldsType>) => {
            return {
                ...state,
                forms: {
                    ...state.forms,
                    [state.activeFormId]: {
                        ...state.forms[state.activeFormId],
                        fields: state.forms[state.activeFormId].fields.filter(e => e.id !== action.payload.id)
                    },
                },
            };
        },
        editField: (state: FormState, action: PayloadAction<{ key: string, value: any }>) => {
            const store = { ...state }
            const edit = store.forms[state.activeFormId].editing
            return {
                ...state, forms: {
                    ...state.forms,
                    [state.activeFormId]: {
                        ...state.forms[state.activeFormId],
                        fields: state.forms[state.activeFormId].fields.map((e) => {
                            if (e.id == edit) {
                                return { ...e, [action.payload.key]: action.payload.value }
                            }
                            return e
                        })
                    }
                }
            }
        },
        editButton: (state: FormState, action: PayloadAction<FieldsType>) => {
            return {
                ...state, forms: {
                    ...state.forms,
                    [state.activeFormId]: {
                        ...state.forms[state.activeFormId],
                        editing: action.payload.id
                    }
                }
            }
        },

        addForm: (state: FormState, action: PayloadAction<{ title: string }>) => {
            const id = Math.random().toString()
            const newForm = {
                id: id,
                title: action.payload.title,
                fields: [],
                editing: null,
            }
            return {
                ...state, forms: {
                    ...state.forms,
                    [id]: newForm
                },
                activeFormId: id
            }
        },
        removeForm: (state: FormState, action: PayloadAction<Form>) => {

            const { [action.payload.id]: _, ...newObj } = state.forms;

            return {
                ...state,
                forms: newObj
            };
        },
        activeForm: (state: FormState, action: PayloadAction<Form>) => {
            return { ...state, activeFormId: action.payload.id }
        }
    }
})


const selectForm = (state: StoreState) => state.form.forms;
const activeFormId = (state: StoreState) => state.form.activeFormId;

export const selectActiveForm = createSelector(
    [selectForm, activeFormId],
    (forms, activeId) => {
        return forms[activeId]
    }
);

export const { addForm, removeForm } = FormSlice.actions


export const { addField, removeField, editField, editButton, activeForm } = FormSlice.actions

const FormReducers = FormSlice.reducer
export type StoreState = ReturnType<typeof store.getState>

export const store = configureStore({
    reducer: {
        form: FormReducers,
    }
})

