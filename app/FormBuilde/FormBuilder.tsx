'use client'

import { useDispatch, useSelector } from "react-redux"
import { editButton, removeField, StoreState } from "../FormStore/FormStore"
import { registry } from "../registry"


export const FormBuilder = () => {

  const fields = useSelector((state: StoreState) => state.form.fields)
  const edit = useSelector((state: StoreState) => state.form.editing)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col bg-foreground w-150 h-130 items-center gap-5 text-background">
      {fields.map((e) => <div onClick={() => dispatch(editButton(e))} className="flex w-140 g-20 bg-gray-400 h-max justify-between" key={e.id}><div className="flex flex-col">
        <div>{registry[e.type].component(e, '', () => { })}</div>
      </div>
        <button className="  hover:bg-foreground rounded-full" onClick={() => dispatch(removeField(e))}>x</button>
      </div>)}
    </div>
  )

}
