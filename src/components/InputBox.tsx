import * as React from 'react'
import { IoSendSharp } from 'react-icons/io5'

export interface InputBoxProps {
  getInput: (text: string) => void
}

export default function InputBox(props: InputBoxProps) {
  const ref = React.useRef<any>()
  const [input, setInput] = React.useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === '') alert('Please enter a valid input')
    console.log(ref.current.value)
    props.getInput(ref.current.value)
    setInput('')
  }
  return (
    <div className="w-full h-[90px] bg-inherit fixed bottom-0 overflow-auto flex justify-center items-center">
      <form className="w-fit h-fit border-gray-400 shadow-lg rounded-md overflow-hidden bg-gray-500 flex justify-center items-center">
        <textarea
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e)
            }
          }}
          value={input}
          ref={ref}
          wrap="hard"
          onChange={({ target: { value } }) => setInput(value)}
          placeholder="Enter you question here..."
          className="max-w-[750px] min-w-[290px] scrollBar_hidden md:w-[750px] h-[52px] bg-inherit focus:outline-none text-white px-2 "
        />
        <IoSendSharp
          onClick={handleSubmit}
          className="text-white text-[24px] cursor-pointer pr-2"
        />
      </form>
    </div>
  )
}
