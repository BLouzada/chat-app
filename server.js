const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const http = require('http')
const container = require('./container')

container.resolve(() => {
  const setupExpress = () => {
    const app = express()
    const server = http.createServer(app)
    server.listen(3000, () => {
      console.log('listening on 3000')
    })
  }
  const app = setupExpress()
})
