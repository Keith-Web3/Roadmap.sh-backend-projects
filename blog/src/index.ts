import { app } from './server'

const HTTP_PORT = 3000
app.listen(HTTP_PORT, () => {
  console.log(`server running on port ${HTTP_PORT}`)
})
