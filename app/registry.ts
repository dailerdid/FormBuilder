
import { CheckElement } from "./FormElements/Elemets/CheckElement";
import { SelectElement } from "./FormElements/Elemets/SelectElement";
import { TextElement } from "./FormElements/Elemets/TextElement";


type elementsType = typeof SelectElement | typeof TextElement | typeof CheckElement
type elementsKeys = elementsType['type']

export const registry: Record<elementsKeys, elementsType> = {
  select: SelectElement,
  text: TextElement,
  check: CheckElement
}
