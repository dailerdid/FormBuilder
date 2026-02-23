import { useEffect, useState } from "react"
import { SelectField } from "../Types/FormTypes"


type OptionsType = {
  options?: { id: string, label: string, value: string }[],
  onChange: (options: OptionsType['options']) => void,
}

export const OptionsCreator = ({ options, onChange }: OptionsType) => {



  const [optionsList, setOptionsList] = useState(options ? options : [])

  useEffect(() => {
    onChange(optionsList)
  }, [optionsList])


  const deleteOpt = (id: string) => {
    setOptionsList(optionsList.filter(e => e.id !== id))
    onChange(optionsList)
  }

  const createOpt = () => {

    setOptionsList((e) => {
      const opt = { id: Math.random().toString(), label: `Option ${optionsList.length + 1} `, value: `option${optionsList.length + 1}` }
      return [...e, opt]
    })
    onChange(optionsList)
  }
  const changes = (id: string, type: "label" | "value", event: string) => {
    setOptionsList(optionsList.map((e) => {
      if (id === e.id) {
        return { ...e, [type]: event }
      }
      return e
    }))
    onChange(optionsList)
  }

  return (

    <div className="flex flex-col gap-3">
      <label>Add Options</label>
      <button onClick={() => createOpt()}>Add</button>
      {optionsList.map((e) => <div>
        <input onChange={(event) => changes(e.id, 'label', event.target.value)} value={e.label}></input>
        <input onChange={(event) => changes(e.id, 'value', event.target.value)} value={e.value}></input>
        <button onClick={() => deleteOpt(e.id)}>x</button>
      </div>)}
    </div>
  )
}
