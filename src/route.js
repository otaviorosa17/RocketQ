const express = require('express')
const questionController = require('./controllers/questionController')
const roomController = require('./controllers/roomController')
const route = express.Router()

route.get('/', (req, res) => res.render('index', { page: 'home' }))
route.get('/create-room', (req, res) =>
  res.render('index', { page: 'create-room' })
)

route.get('/room/:room', roomController.open)

route.post('/new-room', roomController.create)

route.post('/question/create/:room', questionController.create)
route.post('/question/:code/:question/:action', questionController.index)

route.post('/join-room', roomController.enter)

module.exports = route
