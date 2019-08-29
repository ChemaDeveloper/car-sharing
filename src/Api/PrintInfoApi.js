const express = require('express')
const PrintInfo = require('../Classes/PrintInfo')
let info = new PrintInfo()

var infoApi = express()

infoApi.get('/data', (req, res) => {
  res.status(201)
     .json(info.showInfo())
})



module.exports = infoApi
