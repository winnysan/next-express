import express from 'express'
import next from 'next'
import path from 'path'
import dotenv from 'dotenv'
import userRoutes from './api/routes/userRoutes.js'
import uploadRoutes from './api/routes/uploadRoutes.js'
import { errorHandler, notFound } from './api/middleware/errorMiddleware.js'

dotenv.config()

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // Body parser middleware
  server.use(express.json())
  server.use(express.urlencoded({ extended: true }))

  const __dirname = path.resolve()
  server.use('/uploads', express.static(path.join(__dirname, '/uploads')))

  server.use('/api/users', userRoutes)
  server.use('/api/upload', uploadRoutes)

  server.get('/api/cookie', (req, res) => {
    res.cookie('cookie', 'cookie-string', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })

    return res.status(201).send('create cookie')
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.use(notFound)
  server.use(errorHandler)

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`Running on port ${port}, dev: ${dev}`)
  })
})
