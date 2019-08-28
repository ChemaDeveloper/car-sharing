let Rewards = require('../Classes/Rewards')
let rewards = new Rewards()
const express = require('express')

var moneyBoxApi = express()

moneyBoxApi.post('/add', (req, res) => {
  res.status(200)
     .json(rewards.addCoins(req.body.usernames, req.body.coins))
})

moneyBoxApi.post('/remove', (req, res) => {
  res.status(200)
     .json(rewards.removeCoins(req.body.usernames, req.body.coins))
})

module.exports = moneyBoxApi
