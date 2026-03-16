'use client'

import { FormBuilder } from "@/app/form-builder/FormBuilder";
import { useParams } from "next/navigation";


export default function Data() {

    const { id } = useParams<{ id: string }>()

    return (
        <FormBuilder id={id} />
    )
}
