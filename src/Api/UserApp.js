var Users = require('../Classes/Users')
var users = new Users(require('../utils/baseData.json'))

const express = require('express')

var userApp = express()

userApp.get('/', (req, res) => {
  res.status(200)
     .send(users)
     console.log(users)
})

userApp.get('/filter/:filter', (req, res) => {
  users.userList = users.userList.filter((item) => item.seats == "4")
  res.status(201)
     .json({users: users, params: req.params})
})

userApp.get('/restart', (req, res) => {
  users.restartUserList()
  res.status(201)
     .send(users)
})




userApp.post('/create/:name/:lat/:lon/:seats/:userrol', (req, res) => {
  users.createUser(req.params.name, req.params.lat, req.params.lon, req.params.seats, req.params.userrol)
  res.status(201)
     .send(users)
})
userApp.put('/update/:name/:lat/:lon/:seats/:userrol', (req, res) => {
  users.updateUser(req.params.name, req.params.lat, req.params.lon, req.params.seats, req.params.userrol)
  res.status(201)
      .json({users: users, params: req.params})
})
userApp.delete('remove/:name', (req, res) => {

})
module.exports = userApp
