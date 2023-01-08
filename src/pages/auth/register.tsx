'use client'
import axios, { AxiosResponse } from 'axios'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FormEvent, ReactElement, useState } from 'react'

interface Props {}

interface Input {
  name: string
  email: string
  password: string
}
interface Data {
  status: number
  name: string
  email: string
}

export default function RegisterOrLogin({}: Props): ReactElement {
  const router = useRouter()
  const [inputs, setInputs] = useState<Input>({
    name: '',
    email: '',
    password: '',
  })
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (inputs.email === '' || inputs.password === '' || inputs.name === '') {
      alert('Please fill all the inputs!')
    }
    try {
      const res: AxiosResponse<Data> = await axios.post('/api/register', inputs)
      if (res.data.status === 1) {
        router.replace('/auth/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full h-[100vh] bg-black flex flex-col justify-center items-center">
      <form
        className="w-[96%] md:w-[50%] lg:w-[32%] h-fit px-[25px] py-[50px] flex flex-col space-y-7 border border-gray-600 rounded-md bg-inherit shadow-xl"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <p className="w-[30%] m-auto text-white font-[900] uppercase text-center text-[22px]">
            Register
          </p>
        </div>
        <input
          className="h-[45px] rounded-md p-[6px] bg-inherit border text-white"
          type="text"
          value={inputs.name}
          onChange={({ target: { value } }) =>
            setInputs({ ...inputs, name: value })
          }
          placeholder="Enter you Name"
        />
        <input
          className="h-[45px] rounded-md p-[6px] bg-inherit border text-white"
          type="text"
          value={inputs.email}
          onChange={({ target: { value } }) =>
            setInputs({ ...inputs, email: value })
          }
          placeholder="Enter you Email"
        />
        <input
          className="h-[45px] rounded-md p-[6px] bg-inherit border text-white"
          type="password"
          value={inputs.password}
          onChange={({ target: { value } }) =>
            setInputs({ ...inputs, password: value })
          }
          placeholder="Enter you Password"
        />
        <button
          className="w-[40%] m-auto text-white font-medium border border-gray-600 h-[45px] rounded-md"
          type="submit"
        >
          Submit
        </button>
        <div className="w-full ">
          <p className="w-fit m-auto text-center text-gray-400">
            Already Registered?{' '}
            <span
              onClick={() => signIn()}
              className="w-fit text-white hover:underline text-[19px] cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}
