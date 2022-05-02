import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()
import cors from 'cors'
import path from 'path'

const PORT = process.env.PORT || 5000

import router from './router.js'

import mongoClient from './config/db.js'
mongoClient()

app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.use(express.json())
const __dirname = path.resolve()

app.use('/api/v1', router)

app.use((error, req, res, next) => {
  console.log(error)
  res.send(error.message)
})

// if (process.env.NODE_ENV === 'production') {

// app.use(express.static("client"))
// }
app.listen(PORT, (error) => {
  error && console.log(error)

  console.log(`Server is running at http://localhost:${PORT}`)
})
