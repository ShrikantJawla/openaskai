import React, { ReactElement } from 'react'
import Lottie from 'lottie-react'
import LoadingAnmim from '../data/99627-loading-blocks.json'

interface Props {}

export default function LoadingPage({}: Props): ReactElement {
  return (
    <div className="w-[100vw]  h-[100vh] fixed flex justify-center items-center bg-black">
      <Lottie className="w-[50vw] h-[50vh]" animationData={LoadingAnmim} />
    </div>
  )
}
