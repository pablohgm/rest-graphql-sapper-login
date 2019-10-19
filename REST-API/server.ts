import { config } from 'dotenv'
import express from 'express'
import { resolve } from 'path'

config({ path: resolve(__dirname, '.env') })
const port = process.env.PORT
const server: express.Application = express()

server.get('/', (req, res) => {
  res.send('Hello World !!')
})

server.listen(port, () => {
  console.log(`Rest API - 🌎 is listening on port ${port}`)
})

export default server
