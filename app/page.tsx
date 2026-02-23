'use client'

import { LeftBar } from "./LeftBar/LeftBar";
import { FormBuilder } from "./FormBuilder/FormBuilder";
import { RightBar } from "./RightBar/RightBar";

export default function Home() {


  return (
    <div className="flex gap-5 pt-10 items-center">
      <LeftBar></LeftBar>
      <FormBuilder></FormBuilder>
      <RightBar></RightBar>
    </div >
  );
}
