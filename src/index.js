const path = require('path');
const express = require('express');
const cors = require('cors');

const SocketManager = require('./socketManager.js');

const controllers = [];
const services = [];


const ws = new SocketManager("socketManager", socketMessageHandler)

ws.connect()


function socketMessageHandler(topic, message) {
  console.log(topic, message)
  
}


const app = express()
const port = 3000;
app.use(cors())

app.use('/', express.static(path.join(__dirname, './public')))

app.get('/todo', (req, res) => {
  console.log(req.query)
  res.send(JSON.stringify({ type: "todo", message: req.query.message}))
  ws.broadcast("t:" + req.query.message)
})

app.get('/message', (req, res) => {
  console.log(req.query)
  res.send(JSON.stringify({ type: "message", message: req.query.message}))
  ws.broadcast("m:"+req.query.message)
})

app.listen(port, () => {
  console.log(`Manager listening at port ${port}`)
})
