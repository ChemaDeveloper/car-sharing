'use strict'
var constants = require('./utils/Constants.js')
var Users = require('./Classes/Users')
var users = new Users(require('./utils/baseData.json'))


const express = require('express')

// App
const app = express();
app.get('/users', (req, res) => {
  res.send(users)
})

app.get('/users/filter', (req, res) => {
  users.userList.Users = users.userList.Users.filter((item) => item.position.lat == "40.00")
  res.send(users)
})

app.get('/users/restart', (req, res) => {
  users.restartUserList()
  res.send(users)
})


app.listen(constants.PORT, constants.HOST);
console.log(`Running on http://${constants.HOST}:${constants.PORT}`);
