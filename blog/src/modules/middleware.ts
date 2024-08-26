import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

export const validatePayload = function (req, res, next) {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    res.status(400).json({
      error: result.array(),
    })
    return
  }
  next()
}

export const protect = async function (req, res, next) {
  const bearerToken = req.headers.authorization

  if (!bearerToken?.startsWith('Bearer')) {
    res.status(401).json({ message: 'Invalid bearer token' })
    return
  }

  const token = bearerToken.split(' ')[1]

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (err) {
    let message
    console.log
    if (err.name === 'TokenExpiredError') {
      message = 'Token expired, please login again'
    }
    if (err.name === 'JsonWebTokenError') {
      message = 'Invalid bearer token'
    }
    res.status(401).json({ message })
  }
}
