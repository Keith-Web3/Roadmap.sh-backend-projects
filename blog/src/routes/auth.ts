import express from 'express'
import { body, validationResult } from 'express-validator'

const router = express.Router()

const requiredFields = [body('email').isString(), body('password').isString()]

router.post('/signup', requiredFields, () => {})
router.post('/login', requiredFields, () => {})

export default router
