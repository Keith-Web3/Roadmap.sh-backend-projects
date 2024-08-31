#!/usr/bin/env node
import http from 'node:http'
import { Server } from 'socket.io'

const server = http.createServer((req, res) => {
  res.end('Hello world')
})

const io = new Server(server)

server.listen(3000, () => {
  console.log('server listening on port 3000')

  io.on('connection', socket => {
    console.log('a user is connected')
  })
})
