const express = require('express')
const Shift = require('../Classes/Shift')
let shift = new Shift()

var shiftApi = express()

shiftApi.get('/make', (req, res) => {
  res.status(201)
     .json(shift.makeShifts())
})

module.exports = shiftApi
