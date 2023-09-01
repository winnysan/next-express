import express from 'express'
import next from 'next'
import dotenv from 'dotenv'
dotenv.config()

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/api/users', (req, res) => {
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ]
    return res.status(200).json({ users })
  })

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

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`Running on port ${port}, dev: ${dev}`)
  })
})
