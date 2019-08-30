const express = require('express')
const PrintInfo = require('../Classes/PrintInfo')
let info = new PrintInfo()

var infoApi = express()

infoApi.get('/data', (req, res) => {
  res.status(201)
     .json(info.showInfo())
     console.log(info);
})


infoApi.get('/data/detail', (req, res) => {
  users.userList = users.userList.filter((item) => item.seats == "4")
  res.status(201)
     .json({users: users, params: req.params})
})

module.exports = infoApi


