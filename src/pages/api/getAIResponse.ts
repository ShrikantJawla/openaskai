import { NextApiRequest, NextApiResponse } from 'next'
import { openai } from '../../utils/openAI'

type Data = {
  status: number
  response: string | undefined | unknown
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method, body } = req
  try {
    if (method === 'POST') {
      const prompt = body.question
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${prompt}`,
        temperature: 0,
        max_tokens: 4000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      res.status(200).send({
        status: 1,
        response: response.data.choices[0].text,
      })
    } else {
      res.status(405).send({
        status: 0,
        response: 'Method not allowed',
      })
    }
  } catch (error) {
    const { message }: any = error
    console.log(error)
    res.send({
      status: 0,
      response: message,
    })
  }
}

export default handler
