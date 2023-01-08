import { Schema, model, models } from 'mongoose'

interface User {
  id: string
  name: string
  email: string
  password: string
  image: string
}

const userSchema = new Schema<User>({
  id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image: { type: String },
})

export const UserModel = models.user || model<User>('user', userSchema)
