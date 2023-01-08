'use client'
import React from 'react'
import { AllDataType } from '../pages/index'
import { AiFillRobot } from 'react-icons/ai'
import { useSession } from 'next-auth/react'

interface Props {
  data: AllDataType
}

export const TextArea = (props: Props) => {
  const [text, setText] = React.useState<string>('')
  const textContainer = React.useRef<any>(null)
  const { data: session } = useSession()
  function scrollToBottom(): void {
    textContainer.current.scrollTop = textContainer.current.scrollHeight
  }
  let interval: NodeJS.Timer
  const addData = () => {
    let i = 0
    interval = setInterval(() => {
      if (i < props.data[props.data.length - 1]?.response.length) {
        setText(props.data[props.data.length - 1]?.response.slice(0, i))
        i++
        scrollToBottom()
      } else clearInterval(interval)
    }, 30)
  }
  React.useEffect(() => {
    addData()
    return () => clearInterval(interval)
  }, [])
  return (
    <div
      className="w-full md:w-[100%] h-[70vh] lg:h-[520px] p-3 m-auto mt-[20px] overflow-auto scrollBar_hidden space-y-2 "
      ref={textContainer}
    >
      {props.data.length < 1 ? (
        <div className="w-full h-[80px] flex justify-center items-center">
          <p className="w-50% text-white font-[500] text-[25px]">
            Please ask anything from AI.
          </p>
        </div>
      ) : (
        props.data.map((item, ind) => (
          <>
            <div className="flex w-[98%] md:w-[60%] m-auto items-center ">
              {session && session.user && session.user.image && (
                <img
                  className="w-[20px] h-[20px]"
                  src={session && session.user && session.user.image}
                  alt="my"
                />
              )}
              <p
                key={`${Date.now().toString()}-${Math.random()}`}
                className="w-[95%] text-gray-300 py-7 px-3 rounded-md"
              >
                {item.user}
              </p>
            </div>
            <div
              key={`${Date.now().toString()}-${Math.random()}`}
              className="w-full text-gray-300 whitespace-pre-wrap bg-gray-900 py-7 px-3 pl-7 rounded-md"
            >
              <div className="flex w-[98%] md:w-[63%] items-start m-auto ">
                <AiFillRobot className="w-[20px] text-[22px]" />
                <p className="w-[95%] overflow-hidden m-auto">
                  {ind === props.data.length - 1
                    ? `${text}`
                    : `${item.response}`}
                </p>
              </div>
            </div>
          </>
        ))
      )}
    </div>
  )
}
