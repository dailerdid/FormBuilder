import { useDispatch, useSelector } from "react-redux"
import { editFiled, StoreState } from "../FormStore/FormStore"
import { registry } from "../registry"
import { OptionsCreator } from "../FormElements/OptionsCreator"


export const ElementProperties = () => {

    const fields = useSelector((state: StoreState) => state.form.fields)
    const editing = useSelector((state: StoreState) => state.form.editing)
    const field = fields.find((e) => e.id == editing)
    const dispatch = useDispatch()

    return (
        <div onClick={() => console.log(registry[field.type].properties)} className="w-80 h-130 bg-foreground text-background">
            {field && registry[field.type].properties.map((properties) => {
                if (properties.type === 'text') {
                    return <div>
                        <p>{properties.label}</p>
                        <input onChange={(event) => {
                            const value = event.target.value
                            console.log(properties.key, value)
                            dispatch(editFiled({ key: properties.key, value }))
                        }} placeholder="Something..."></input>
                    </div>
                }
                if (properties.type === 'select') {
                    return <div>
                        <p>{properties.label}</p>
                        <select onChange={(event) => {
                            const value = event.target.value
                            dispatch(editFiled({ key: properties.key, value }))
                        }}>
                            {properties.options.map(i => <option value={i.value}>{i.label}</option>)}
                        </select>
                    </div>
                }
                if (properties.type === 'check') {
                    return <div>
                        <label>{properties.label}</label>
                        <input type="checkbox"></input>
                    </div>
                }
                if (properties.type === 'options-control') {
                    return (
                        <OptionsCreator onChange={(event) => {
                            dispatch(editFiled({ key: properties.key, value: event }))
                        }}></OptionsCreator>
                    )
                }
                return <div><p>Default</p></div>
            })}
        </div>
    )
}
