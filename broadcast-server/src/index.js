#!/usr/bin/env node
import http from 'node:http'
import { Server } from 'socket.io'
import ioClient from 'socket.io-client'

if (process.argv[2].toLowerCase() === 'start') {
  const server = http.createServer((req, res) => {
    res.end('Hello world')
  })

  const io = new Server(server)

  server.listen(3000, () => {
    console.log('server listening on port 3000')

    io.on('connection', socket => {
      console.log('a user is connected')

      socket.on('broadcast-client', message => {
        io.emit('broadcast-server', message)
      })
    })

    console.log(io.path())
  })
} else if (process.argv[2] === 'connect') {
  const socket = ioClient.connect('http://localhost:3000')

  socket.on('connect', () => {
    console.log('connected')
  })

  socket.on('disconnect', () => {
    console.log('disconnected')
  })

  socket.emit('broadcast-client', 'How to train your dragon')

  socket.on('broadcast-server', message => {
    console.log(`server says: ${message}`)
  })
} else {
  console.log(
    "Unrecognized command. Run 'broadcast-server start' to start up a server and 'broadcast-server connect' to connect to it"
  )
  process.exit()
}
