const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const helmet = require('helmet');

const userRouter = require('./routes/user-route.js');

const sessionConfig = {
  name: 'userID', // sid
  secret: 'useID credential data.',
  cookie: {
    maxAge: 1000 * 60,
    secure: false, // true in production
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
}

const server = express();
server.use(session(sessionConfig))
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(morgan("combined"));
server.use(helmet());

server.use('/api', userRouter);

module.exports = server;