import Image from "next/image";
import { textElement } from "./elements";
import { OptionsControl } from "./option-control";

export default function Home() {
  return (
    <div>
      {textElement && textElement.properties.map((property) => {

        if (property.type === 'select') {
          return (

            <div>
              {property.label}
              <select onChange={(changeevent) => {
                const value = changeevent.target.value

                dispatch(editfield({ key: property.key, value }))
              }}>
                {property.options!.map(i => <option value={i.value}>{i.label}</option>)}
              </select>
            </div>
          )
        }

        if (property.type === 'option-control') {
          return (
            <OptionsControl onChange={(options) => {
              dispatch(editfield(property.key, options))
            }}></OptionsControl>
          )

        }

        return <div>dawd</div>
      )}

    </div>
  );
}
