var Users = require('../Classes/Users')
var users = new Users(require('../utils/baseData.json'))
const express = require('express')
var userApp = express()

userApp.get('/', (req, res) => {
  res.status(200)
     .send(users)
     console.log(users)
})

userApp.post('/create/:name/:lat/:lon/:seats/:userrol', (req, res) => {
  users.createUser(req.params.name, req.params.lat, req.params.lon, req.params.seats, req.params.userrol)
  res.status(201)
     .send(users)
})

userApp.get('/userDistance', (req, res) => {
  let orderedUsers = users.getUserOrderByTimeDistance(users, {
                                                                position: JSON.parse(req.body.position),
                                                                route: {
                                                                  travelTime: req.body.fecha
                                                                }
                                                              })
  res.status(201)
     .json(orderedUsers)
})

userApp.get('/fillCar/:name', (req, res) => {
  let driverUser = users.fillCar(req.params.name);
  res.status(201)
  .json(driverUser)
})

userApp.get('/fillCars', (req, res) => {
  let drivers = users.fillCars();
  res.status(201)
  .json(drivers)
})

userApp.get('/passengersFillCars', (req, res) => {
  let driversFillCar = users.passengersFillCars();
  res.status(201)
  .json(driversFillCar)
})

userApp.get('/makeShifts', (req, res) => {
  let driversFillBank = users.driverFillBank();
  res.status(201)
  .json(driversFillBank)
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

userApp.post('/delete/:name', (req, res) => {
  let user = users.deleteUser(decodeURI(req.params.name));
  res.status(201)
  .json({user: user, params: req.params})
})

module.exports = userApp
