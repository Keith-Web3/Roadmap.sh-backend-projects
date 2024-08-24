import { body } from 'express-validator'
import prisma from '../db'
import { comparePasswords, createJWT, hashPassword } from '../modules/utils'

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

export const login = async function (req, res) {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    res
      .status(404)
      .json({ message: 'There is no registered user with this email' })
    return
  }

  const isPasswordCorrect = await comparePasswords(password, user.password)

  if (!isPasswordCorrect) {
    res.status(400).json({ message: 'Invalid email or password' })
    return
  }

  const token = createJWT(user)

  res.status(200).json({ data: { user, token } })
}
