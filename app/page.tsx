'use client'

import { AudioLinesIcon } from "lucide-react";
import { Dashboard } from "./form-builder/Dashboard";
import { FormBuilder } from "./form-builder/FormBuilder";


export default function Home() {

  const mas = [3, 2, 7, 5, 9, 6, 1, 4, 8]


  const quickStart = (arr: number[], i = 0, j = arr.length - 1) => {

    if (i < j) {
      const index = helper(arr, i, j)
      quickStart(arr, i, index - 1)
      quickStart(arr, index + 1, j)
    }
    console.log(arr)
    return arr
  }

  const helper = (arr: number[], i: number, j: number) => {
    const pivot = arr[j]
    let ij = i - 1

    for (let ji = i; ji < j; ji++) {
      if (arr[ji] <= pivot) {
        ij++;
        [arr[ij], arr[ji]] = [arr[ji], arr[ij]]
      }
    } [arr[ij + 1], arr[j]] = [arr[j], arr[ij + 1]]
    return ij + 1
  }



  return (
    <div className="w-full h-screen overflow-hidden">
      <button >CLICK ME</button>
      <Dashboard />
    </div>
  );
}
