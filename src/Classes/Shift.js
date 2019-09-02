'use strict'
let Users = require('../Classes/Users')
let users = new Users(require('../utils/baseData.json'))
let Rewards = require('../Classes/Rewards')

class Shift {
  makeShifts() {
    let drivers = users.getDrivers()
    console.log(drivers)
    console.log(users)
    return users
  }
}

module.exports = Shift
