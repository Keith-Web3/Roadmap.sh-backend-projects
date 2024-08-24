import { body } from 'express-validator'

import prisma from '../db'
import { createJWT, hashPassword } from '../modules/utils'

export const signup = async function (req, res) {
  const { email, password } = req.body

  const hashedPassword = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  const token = createJWT(user)

  res.status(201).json({ data: { user, token } })
}
