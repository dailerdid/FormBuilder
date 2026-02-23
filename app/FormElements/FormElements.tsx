import { FormElement } from "../Types/ElementTypes";
import { SelectElement } from "./Elemets/SelectElement";
import { TextElement } from "./Elemets/TextElement";


export const Element = ({ type, serialize, component, properties }): FormElement => {


  return (
    <div>
      {type == "text" ? <TextElement></TextElement> : <SelectElement></SelectElement>}
    </div>
  )
}
