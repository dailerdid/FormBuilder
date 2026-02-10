import { createContext, useContext } from "react";


export const FormBuilderContext = createContext(undefined)

export const FormBuilderReducer = () => {
  const store = useContext(FormBuilderContext)
  return { ...store }
}
