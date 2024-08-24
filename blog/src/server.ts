import express from 'express'
import morgan from 'morgan'

import authRouter from './routes/auth'

export const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  console.log('Response to request')
  res.json({ message: 'hello world' })
})

app.use('/api/auth', authRouter)
