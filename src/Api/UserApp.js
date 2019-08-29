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
  users.restartUserList(req.params.name)
  res.status(201)
     .send(users)
})

userApp.post('/create/:name/:lat/:lon/:seats/:userrol', (req, res) => {
  users.createUser(req.params.name, req.params.lat, req.params.lon, req.params.seats, req.params.userrol)
  res.status(201)
     .send(users)
})

userApp.get('/userDistance', (req, res) => {
  let orderedUsers = users.getPassengersOrdererByTimeDistance(users, {
                                                                position: JSON.parse(req.body.position), 
                                                                route: {
                                                                  travelTime: req.body.fecha
                                                                }
                                                              })
  res.status(201)
     .json(orderedUsers)
})

userApp.get('/detail/:name', (req, res) => {
  let user = users.readbyUser(decodeURI(req.params.name));
  res.status(201)
  .json({user: user, params: req.params})

})

userApp.put('/update', (req, res) => {
  let userUpdated = users.updateUser(req.body.username,req.body.lat,req.body.lon,req.body.userRol,req.body.seats);
  res.status(200)
     .json({user: userUpdated, params: req.body});
})

userApp.get('/delete/:name', (req, res) => {
  let user = users.deleteUser(decodeURI(req.params.name));
  res.status(201)
  .json({user: user, params: req.params})
})

module.exports = userApp
