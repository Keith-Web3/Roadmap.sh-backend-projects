import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const createJWT = function (user: User) {
  const token = jwt.sign(
    { email: user.email, id: user.id },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  )

  return token
}

export const hashPassword = function (password) {
  return bcrypt.hash(password, 10)
}
