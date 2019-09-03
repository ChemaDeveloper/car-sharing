const express = require('express')
const PrintInfo = require('../Classes/PrintInfo')
let info = new PrintInfo()

var infoApi = express()

infoApi.get('/users', (req, res) => {
  res.status(201)
     .json(info.showInfo())
     console.table(info);
})


infoApi.get('/user/detail/:username', (req, res) => {
  users.userList = users.userList.filter(user => user.username == req.params.username)
  res.status(201)
     .json({users: users, params: req.params})
})

module.exports = infoApi
