import { registry } from "@/app/registry"
import { useDispatch } from "react-redux"
import { addField } from "../builder-store/store"


export const ElementsList = () => {

    const dispatch = useDispatch()

    return (
        <div className="w-80 h-130 bg-foreground text-background">
            <div className="flex flex-col gap-3">
                {Object.entries(registry).map(([key, value]) => <div>
                    <button className="bg-gray-300 rounded-3xl" onClick={() => dispatch(addField(value.construct(Math.random().toString())))}>{key}</button>
                </div>)}
            </div>
        </div>
    )
}
