import { configureStore, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FieldsType, Form, FormState } from "../builder-types/form-types";
import { act } from "react";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { ParamValue } from "next/dist/server/request/params";
import { ValidationConfig } from "../builder-validation-rules/validation-types";

const persistConfig = {
    key: 'root',
    storage,
}

const initialId = '0000'


const builderInitialState: Form = {
    id: initialId,
    title: 'initialForm',
    fields: [],
    editing: null,
}

const formInitialState: FormState = {
    forms: {},
    submitData: {}
}


export const FormSlice = createSlice({
    name: 'Form',
    initialState: formInitialState,
    reducers: {
        addField: (state: FormState, action: PayloadAction<{ data: FieldsType, formID: string }>) => {
            console.log(action.payload.formID)
            return {
                ...state,
                forms: {
                    ...state.forms,
                    [action.payload.formID]: {
                        ...state.forms[action.payload.formID],
                        fields: [...state.forms[action.payload.formID].fields, action.payload.data]
                    },
                },
            };
        },
        reorderFields: (state: FormState, action: PayloadAction<{ activeId: string, overId: string, formId: string }>) => {
            const form = state.forms[action.payload.formId];
            if (!form) return state;
            const oldIndex = form.fields.findIndex(f => f.id === action.payload.activeId);
            const newIndex = form.fields.findIndex(f => f.id === action.payload.overId);
            if (oldIndex === -1 || newIndex === -1) return state;
            const newFields = [...form.fields];
            const [movedItem] = newFields.splice(oldIndex, 1);
            newFields.splice(newIndex, 0, movedItem);
            return {
                ...state,
                forms: {
                    ...state.forms,
                    [action.payload.formId]: {
                        ...form,
                        fields: newFields
                    }
                }
            };
        },
        insertFieldAtIndex: (state: FormState, action: PayloadAction<{ data: FieldsType, index: number, formId: string }>) => {
            const form = state.forms[action.payload.formId];
            if (!form) return state;
            const newFields = [...form.fields];
            newFields.splice(action.payload.index, 0, action.payload.data);
            return {
                ...state,
                forms: {
                    ...state.forms,
                    [action.payload.formId]: {
                        ...form,
                        fields: newFields
                    },
                },
            };
        }, removeField: (state: FormState, action: PayloadAction<{ data: FieldsType, formId: string }>) => {
            return {
                ...state,
                forms: {
                    ...state.forms,
                    [action.payload.formId]: {
                        ...state.forms[action.payload.formId],
                        fields: state.forms[action.payload.formId].fields.filter(e => e.id !== action.payload.data.id)
                    },
                },
            };
        },
        editField: (state: FormState, action: PayloadAction<{ data: { key: string, value: any }, formId: string }>) => {
            const store = { ...state }
            const edit = store.forms[action.payload.formId].editing
            return {
                ...state, forms: {
                    ...state.forms,
                    [action.payload.formId]: {
                        ...state.forms[action.payload.formId],
                        fields: state.forms[action.payload.formId].fields.map((e) => {
                            if (e.id == edit) {
                                return { ...e, [action.payload.data.key]: action.payload.data.value }
                            }
                            return e
                        })
                    }
                }
            }
        },
        editButton: (state: FormState, action: PayloadAction<{ data: FieldsType, formId: string }>) => {
            return {
                ...state, forms: {
                    ...state.forms,
                    [action.payload.formId]: {
                        ...state.forms[action.payload.formId],
                        editing: action.payload.data.id
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
            }
        },
        removeForm: (state: FormState, action: PayloadAction<Form>) => {

            const { [action.payload.id]: _, ...newObj } = state.forms;
            return {
                ...state,
                forms: newObj,
            };
        },
        submitFormData: (state: FormState, action: PayloadAction<{ data: Record<string, any>, formID: string }>) => {
            const currentData = state.submitData[action.payload.formID];
            const dataArray = Array.isArray(currentData) ? currentData : (currentData ? [currentData] : []);

            return {
                ...state,
                submitData: {
                    ...state.submitData,
                    [action.payload.formID]: [...dataArray, action.payload.data]
                }
            };
        },
        addValidationRule: (state: FormState, action: PayloadAction<{ data: ValidationConfig, formId: string, fieldId: string }>) => {
            return {
                ...state,
                forms: {
                    ...state.forms,
                    [action.payload.formId]: {
                        ...state.forms[action.payload.formId],
                        fields: state.forms[action.payload.formId].fields.map((e) => {
                            if (e.id === action.payload.fieldId) {
                                return {
                                    ...e,
                                    validation: [
                                        ...e.validation.filter((rule) => rule.type !== action.payload.data.type),
                                        action.payload.data
                                    ]
                                }
                            } return e
                        })
                    }
                }
            }
        },
        removeValidationRule: (state: FormState, action: PayloadAction<{ type: string, formId: string, fieldId: string }>) => {
            return {
                ...state,
                forms: {
                    ...state.forms,
                    [action.payload.formId]: {
                        ...state.forms[action.payload.formId],
                        fields: state.forms[action.payload.formId].fields.map((e) => {
                            if (e.id === action.payload.fieldId) {
                                return {
                                    ...e,
                                    validation: [
                                        ...e.validation.filter((rule) => rule.type !== action.payload.type)

                                    ]
                                }
                            } return e
                        })
                    }
                }
            }
        }
    }
})




export const { addForm, removeForm } = FormSlice.actions


export const { addField, removeField, editField, editButton, submitFormData, addValidationRule, removeValidationRule, reorderFields, insertFieldAtIndex } = FormSlice.actions

const persistedReducer = persistReducer(persistConfig, FormSlice.reducer)

export const store = configureStore({
    reducer: {
        form: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)

export type StoreState = ReturnType<typeof store.getState>

