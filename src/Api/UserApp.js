var Users = require('../Classes/Users')
var users = new Users(require('../utils/baseData.json'))
const express = require('express')

var userApp = express()

userApp.get('/', (req, res) => {
  res.status(200)
     .send(users)
})

userApp.get('/filter/:filter', (req, res) => {
  users.userList = users.userList.filter((item) => item.position.lat == "40.00")
  res.status(201)
     .json({users: users, params: req.params})
})

userApp.get('/restart', (req, res) => {
  users.restartUserList()
  res.status(201)
     .send(users)
})

module.exports = userApp
