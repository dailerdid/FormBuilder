import { Provider } from "react-redux"
import { ElementProperties } from "./builder-element-properties/element-properties"
import { ElementsList } from "./builder-elements-list/elements-list"
import { Renderer } from "./builder-renderer/renderer"
import { store } from "./builder-store/store"


export const FormBuilder = () => {


  return (
    <Provider store={store}>
      <ElementsList />
      <Renderer />
      <ElementProperties />
    </Provider>
  )
}
