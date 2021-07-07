const express = require('express');
const cors = require('cors')
const server = express();
server.use(express.json())
server.use(cors())
server.use(logger)
const userRouter = require('./users/userRouter')
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use('/api/user',userRouter)
//custom middleware

function logger(req, res, next) {
  
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}` 
  )

  next();
}

module.exports = server;
