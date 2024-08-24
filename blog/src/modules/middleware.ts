import { validationResult } from 'express-validator'

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
