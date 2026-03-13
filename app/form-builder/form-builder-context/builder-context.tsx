import { createContext, useContext } from "react";


export interface BuilderContextType {
  id: string,
  children: any
}


export const BuilderContext = createContext<{ id: string }>({ id: '' })

export const useBuilder = () => {
  const context = useContext(BuilderContext)
  return (
    { ...context }
  )
}

export const BuilderContextProvider = ({ id, children }: BuilderContextType) => {



  return (
    <BuilderContext.Provider value={{ id: id }}>
      {children}
    </BuilderContext.Provider>
  )

}
