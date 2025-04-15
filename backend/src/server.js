const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

server = require('http').Server(app);
const io = require('socket.io') (server);

const app = express();

io.on('connection', (socket) => {
  socket.on('connectRoom', (box) => {
    socket.join(box);
  });
}
);




mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))

  app.use((req, res, next) => {
    req.io = io;
    return next();
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
}
);
