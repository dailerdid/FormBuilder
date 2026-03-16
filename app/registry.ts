import { CheckElement } from "./form-builder/builder-elements/check-element"
import { DateElement } from "./form-builder/builder-elements/date-element"
import { EmailElement } from "./form-builder/builder-elements/email-element"
import { FileElement } from "./form-builder/builder-elements/file-element"
import { NumberElement } from "./form-builder/builder-elements/numeric-element"
import { PasswordElement } from "./form-builder/builder-elements/password-element"
import { RadioGroupElement } from "./form-builder/builder-elements/radio-group-element"
import { RangeElement } from "./form-builder/builder-elements/range-element"
import { SelectElement } from "./form-builder/builder-elements/select-element"
import { TelElement } from "./form-builder/builder-elements/tel-element"
import { TextareaElement } from "./form-builder/builder-elements/text-area-element"
import { TextElement } from "./form-builder/builder-elements/text-element"



export type elementsType = typeof SelectElement | typeof TextElement | typeof CheckElement | typeof EmailElement | typeof PasswordElement | typeof RangeElement | typeof TelElement | typeof TextareaElement | typeof NumberElement | typeof RadioGroupElement | typeof DateElement | typeof FileElement
export type elementsKeys = elementsType['type']

export const registry: Record<elementsKeys, elementsType> = {
  select: SelectElement,
  text: TextElement,
  check: CheckElement,
  email: EmailElement,
  password: PasswordElement,
  range: RangeElement,
  tel: TelElement,
  textarea: TextareaElement,
  number: NumberElement,
  'radio-group': RadioGroupElement,
  date: DateElement,
  file: FileElement
}
