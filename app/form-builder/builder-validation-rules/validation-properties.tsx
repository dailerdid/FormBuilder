import { registry } from "@/app/registry"
import { validationKeys, validationRegistry } from "./validation-regisrty"
import { BaseField } from "../builder-types/form-types"
import type { ValidationConfig, ValidationField } from "./validation-types"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { addValidationRule, removeValidationRule, StoreState } from "../builder-store/store"
import { useBuilder } from "../form-builder-context/builder-context"


export const ValidationProperties = ({ activeField }: { activeField: BaseField }) => {

  const [value, setValue] = useState<validationKeys | null>(null)
  const dispatch = useDispatch()
  const { id } = useBuilder()
  const { register, handleSubmit } = useForm()
  const onSubmit = (e: ValidationConfig) => {
    const selectedValidation = validationRegistry[value].construct(e)
    dispatch(addValidationRule({ data: selectedValidation, formId: id, fieldId: activeField.id }))
  }
  const validation = useSelector((e: StoreState) => e.form.forms[id].fields)
  const currentField = validation.find((e) => e.id === activeField.id)

  return (
    <div>
      {currentField && currentField.validation.map((e) => {
        return (
          <div className="flex gap-3" key={e.value}>
            <p >{e.errorMessage}</p>
            <p >{e.type}</p>
            <button className="text-red-400" onClick={() => dispatch(removeValidationRule({ type: e.type, formId: id, fieldId: activeField.id }))}>x</button>
          </div>
        )
      })}
      <select defaultValue="" onChange={(e) => setValue(e.target.value as validationKeys)}>
        <option value="" disabled>select rule</option>
        {registry[activeField.type].validation.map((rules) => {
          return (
            <option value={rules.type}>{rules.label}</option>
          )
        })}
      </select>
      <form onSubmit={handleSubmit(onSubmit)}>
        {value && validationRegistry[value].fields.map((e) => {

          if (e.type === 'text') {
            return (
              <>
                <p>{e.key}</p>
                <input {...register(e.key, { required: true })} placeholder={e.type} type="text"></input>
              </>
            )
          }
          if (e.type === 'number') {
            return (
              <>
                <p>{e.key}</p>
                <input {...register(e.key, { required: true })} placeholder={e.type} type="number"></input>
              </>
            )
          }
          return undefined
        })}
        <input type="submit" />
      </form>
    </div>
  )
}
