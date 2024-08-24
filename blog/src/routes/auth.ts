import express from 'express'
import { body } from 'express-validator'
import { login, signup } from '../handlers/auth'
import { validatePayload } from '../modules/middleware'

const router = express.Router()

const requiredFields = [body('email').isString(), body('password').isString()]

router.use(requiredFields, validatePayload)

router.post('/signup', signup)
router.post('/login', login)

export default router
