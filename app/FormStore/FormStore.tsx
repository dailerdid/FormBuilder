import { configureStore, createSlice } from "@reduxjs/toolkit";
import { BaseField, Form } from "../Types/FormTypes";



const formInitialState: Form = {
  id: Math.random().toString(),
  title: 'initialForm',
  fields: [],
}

export const FormSlice = createSlice({
  name: 'Form',
  initialState: formInitialState,
  reducers: {
    addField: (e) => {

    },
    removeField: (e) => {

    },
    editFiled: (e) => {
    }
  }
})

const FormReducers = FormSlice.reducer

export const store = configureStore({
  reducer: {
    form: FormReducers
  }
})





