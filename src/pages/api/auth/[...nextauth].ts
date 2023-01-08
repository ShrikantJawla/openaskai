import NextAuth, { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import axios, { AxiosResponse } from 'axios'
import { UserModel } from '../../../models/user.model'
import dbConnect from '../../../utils/mongodbConfig'

declare var process: {
  env: {
    GITHUB_ID: string
    GITHUB_SECRET: string
    BASE_URL: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
  }
}

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        interface User {
          id: string
          name: string
          email: string
        }
        const res: AxiosResponse<{
          status: number
          user: User
        }> = await axios.post(process.env.BASE_URL + '/api/login', {
          email: credentials?.username,
          password: credentials?.password,
        })
        if (res.data.status === 1) {
          const user = res.data.user
          return user
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      try {
        await dbConnect()
        const existingUser = await UserModel.findOne({ email: user.email })
        if (!existingUser) {
          await UserModel.create({
            email: user.email,
            name: user.name,
            image: user.image,
          })
        }
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async redirect({ url, baseUrl }: any) {
      return baseUrl
    },
  },
  pages: {
    signIn: '/auth/login',
  },
} as AuthOptions

export default NextAuth(authOptions)
