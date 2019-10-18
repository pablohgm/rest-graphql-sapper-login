import { resolve } from "path"
import { config } from "dotenv"
import express from 'express'

config({ path: resolve(__dirname, "../.env") })
const port = process.env.PORT
const server: express.Application = express()

server.get('/', (req, res) => {
    res.send('Hello World !!')
})

server.listen(port, () => {
    console.log(`Rest API - 🌎 is listening on port ${port}`)
})