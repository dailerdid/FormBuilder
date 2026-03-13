import { useDispatch, useSelector } from "react-redux"
import { activeForm, addForm, removeForm, StoreState } from "./builder-store/store"
import { ChangeEventHandler, useState } from "react"
import Link from "next/link"


export const Dashboard = () => {

  const [title, setTitle] = useState('')
  const onChange = (event: any) => {
    setTitle(event.target.value)
  }


  const dispatch = useDispatch()
  const formsState = useSelector((state: StoreState) => state.form.forms)
  const forms = Object.entries(formsState)

  return (

    <div>
      <input onChange={onChange} placeholder="Form title..."></input>
      <button onClick={() => dispatch(addForm({ title }))}>Create Form</button>
      {forms && forms.map(([key, value]) => {
        return (
          <div onClick={() => dispatch(activeForm(value))}>
            <p>{value.title}</p>
            <button onClick={() => dispatch(removeForm(value))}>x</button>
            <Link href={`/builder/${value.id}`}>Edit</Link>
          </div>
        )
      })}
    </div>
  )
}
