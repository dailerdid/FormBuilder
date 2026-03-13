import { CheckElement } from "./form-builder/builder-elements/check-element"
import { EmailElement } from "./form-builder/builder-elements/email-element"
import { PasswordElement } from "./form-builder/builder-elements/password-element"
import { SelectElement } from "./form-builder/builder-elements/select-element"
import { TextElement } from "./form-builder/builder-elements/text-element"



type elementsType = typeof SelectElement | typeof TextElement | typeof CheckElement | typeof EmailElement | typeof PasswordElement
type elementsKeys = elementsType['type']

export const registry: Record<elementsKeys, elementsType> = {
  select: SelectElement,
  text: TextElement,
  check: CheckElement,
  email: EmailElement,
  password: PasswordElement
}
