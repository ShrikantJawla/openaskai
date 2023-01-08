import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../utils/mongodbConfig'
import { UserModel } from '../../models/user.model'
import argon2 from 'argon2'

interface Res {
  status: number
  message: string
}
interface UserRes {
  status: number
  user: {
    name: string
    email: string
  }
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Res | UserRes>,
) => {
  const { body, method } = req
  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = body

  try {
    if (method === 'POST') {
      await dbConnect()
      const existingUser = await UserModel.findOne({ email })
      if (!existingUser) {
        const hash = await argon2.hash(password)
        const newUser = await UserModel.create({ email, password: hash, name })
        return res.send({
          status: 1,
          user: { name: newUser.name, email: newUser.email },
        })
      } else
        return res.status(400).json({
          status: 0,
          message: 'somethong went wrong try with another inputs!',
        })
    }
  } catch (error) {
    const { message }: any = error
    res.status(500).send({
      status: 0,
      message,
    })
  }
}

export default handler
