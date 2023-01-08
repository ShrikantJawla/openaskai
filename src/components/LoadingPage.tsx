import React, { ReactElement } from 'react'
import Lottie from 'lottie-react'
import LoadingAnmim from '../data/99627-loading-blocks.json'

interface Props {}

export default function LoadingPage({}: Props): ReactElement {
  return (
    <div className="w-full h-[100vh] fixed flex justify-center items-center">
        <Lottie className='w-full' animationData={LoadingAnmim} />
    </div>
  )
}
