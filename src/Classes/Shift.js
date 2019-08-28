'use strict'
let Users = require('../Classes/Users')
let users = new Users(require('../utils/baseData.json'))

class Shift {
  constructor() {
  }
  makeShifts() {
    let drivers = new Users()
    console.log(drivers)
    console.log(users)
    return users
  }
}

module.exports = Shift
