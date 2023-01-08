'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { FormEvent, ReactElement, useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

interface Props {}

interface Input {
  email: string
  password: string
}

export default function Login({}: Props): ReactElement {
  const [inputs, setInputs] = useState<Input>({
    email: '',
    password: '',
  })
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (inputs.email === '' || inputs.password === '') {
      alert('Please fill all the inputs!')
    }
    try {
      const res = await signIn('credentials', {
        username: inputs.email,
        password: inputs.password,
        redirect: true,
        callbackUrl: '/',
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full h-[100vh] bg-[#111111] flex flex-col justify-center items-center space-y-3">
      <div className="w-[96%] md:w-[44%] lg:w-[32%] h-fit px-[27px] py-[30px] flex flex-col space-y-1 border border-gray-600 rounded-lg bg-black shadow-xl">
        <form
          className="w-full h-fit px-[25px] py-[10px] flex flex-col space-y-7 rounded-md bg-inherit shadow-xl"
          onSubmit={handleSubmit}
        >
          <div className="w-full">
            <p className="w-[70%] m-auto text-white font-[600] uppercase text-center text-[22px]">
              Login
            </p>
          </div>
          <input
            className="h-[45px] rounded-md p-[6px] bg-inherit border text-white"
            type="text"
            value={inputs.email}
            onChange={({ target: { value } }) =>
              setInputs({ ...inputs, email: value })
            }
          />
          <input
            className="h-[45px] rounded-md p-[6px] bg-inherit border text-white"
            type="password"
            value={inputs.password}
            onChange={({ target: { value } }) =>
              setInputs({ ...inputs, password: value })
            }
          />
          <button
            className="w-[40%] m-auto text-white font-medium border border-gray-600 h-[45px] rounded-md"
            type="submit"
          >
            Submit
          </button>
        </form>
        <div className="w-full h-fit p-[10px] px-[30px] flex items-center justify-between space-x-4">
          <div
            onClick={() => signIn('github')}
            className="cursor-pointer w-1/2 border border-gray-400 rounded-md p-[5px] flex justify-center space-x-4"
          >
            <AiFillGithub className="text-white text-[42px] h-full " />
            <button className="text-white">Github</button>
          </div>
          <div
            onClick={() => signIn('google')}
            className="cursor-pointer w-1/2 border border-gray-400 rounded-md p-[5px] flex justify-center space-x-4"
          >
            <FcGoogle className="text-white text-[42px] h-full " />
            <button className="text-white">Google</button>
          </div>
        </div>
        <div className="w-full ">
          <p className="w-fit m-auto text-center text-gray-400">
            Not Signed up yet?{' '}
            <span className="w-fit text-white hover:underline text-[19px]">
              <Link href={'/auth/register'}>Register</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
