const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv')
const { head } = require('./routes')
dotenv.config()

const app = express()

app.use(cors(
  {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }
))

const server = require('http').Server(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    headers: ['Content-Type', 'Authorization'],
    accept: ['application/json'],
  },
  pingTimeout: 60000,
  pingInterval: 25000,
}
)

io.on('connection', socket => {
  console.log('A user connected')
  socket.on('connectRoom', box => {
    console.log('User joined box:', box)
    socket.join(box)
  })

})

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

app.use((req, res, next) => {
  req.io = io

  return next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

if (process.env.NODE_ENV !== 'production') {
  const uploadsPath = path.resolve(__dirname, '..', 'uploads')
  app.use('/uploads', express.static(uploadsPath))
}

app.use(require('./routes'))

server.listen(process.env.PORT, () => {
  console.log('Server started on port', process.env.PORT)
}
)