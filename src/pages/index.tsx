import { useState } from 'react'
import Head from 'next/head'
import InputBox from '../components/InputBox'
import { Navbar } from '../components/Navbar'
import { TextArea } from '../components/TextArea'
import { useSession, signIn, signOut } from 'next-auth/react'
import axios from 'axios'
import LoadingPage from '../components/LoadingPage'

export type SingleQuery = {
  user: string
  response: string
}

export type AllDataType = Array<SingleQuery>

export default function Home() {
  const [allData, setAllData] = useState<AllDataType>([])
  const { status } = useSession()

  if (status === 'loading') {
    return <LoadingPage />
  }
  if (status === 'unauthenticated') {
    signIn()
  }

  const getInput = async (input: string) => {
    try {
      const { data } = await axios.post('/api/getAIResponse', {
        question: input,
      })
      if (data.status === 1) {
        setAllData([...allData, { user: input, response: data.response }])
      }
    } catch (error) {
      const { message }: any = error
      alert(message)
    }
  }

  return (
    <>
      <Head>
        <title>OpenAskAI | Ask any question</title>
        <meta
          name="description"
          content="openAskAI is AI to answer you question"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black w-full h-[100vh]">
        <Navbar />
        <TextArea key={Date.now().toString()} data={allData} />
        <InputBox getInput={getInput} />
      </main>
    </>
  )
}
