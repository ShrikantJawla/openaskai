import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

interface Props {}

export const Navbar = (props: Props) => {
  const { data: session, status } = useSession()
  return (
    <div className="w-full h-[75px] sticky top-0 shadow-lg bg-gray-700 flex justify-between">
      <div className="h-full text-[19px] md:text-[20px] flex justify-center items-center w-fit px-4 text-white font-[700]">
        OpenAskAI
      </div>
      <div className="h-full flex justify-center items-center w-fit px-7 space-x-2 md:space-x-7">
        {status === 'authenticated' ? (
          <>
            <div className="h-full flex justify-center items-center w-fit px-7 space-x-0 md:space-x-1">
              {session?.user?.image && (
                <img
                  className="h-[35px] rounded-full"
                  src={session.user.image}
                  alt="user"
                />
              )}
              <p
                onClick={() => signOut()}
                className=" hidden md:flex text-gray-400 text-[18px] p-[4px] px-3"
              >
                Hi! <span className='text-white ml-1 text-[22px] font-[700]'>{session.user?.name}</span>
              </p>
            </div>
            <p
              onClick={() => signOut()}
              className="text-white text-[18px] cursor-pointer uppercase hover:underline border p-[4px] px-3 rounded-md"
            >
              Logout
            </p>
          </>
        ) : (
          <>
            <p
              onClick={() => signIn()}
              className="text-white text-[18px] cursor-pointer uppercase hover:underline border p-[4px] px-3 rounded-md"
            >
              Login
            </p>
            <Link href={'/auth/register'}>
              <p className="text-white text-[18px] uppercase hover:underline border p-[4px] px-3 rounded-md">
                Register
              </p>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
