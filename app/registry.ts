import { CheckElement } from "./form-builder/builder-elements/check-element"
import { SelectElement } from "./form-builder/builder-elements/select-element"
import { TextElement } from "./form-builder/builder-elements/text-element"



type elementsType = typeof SelectElement | typeof TextElement | typeof CheckElement
type elementsKeys = elementsType['type']

export const registry: Record<elementsKeys, elementsType> = {
  select: SelectElement,
  text: TextElement,
  check: CheckElement
}
