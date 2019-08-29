'use strict'
let Users = require('../Classes/Users')
let users = new Users(require('../utils/baseData.json'))

class PrintInfo {
  constructor() {
  }
  showInfo(username, position) {
    console.table(users);
    users.userList.map(user => {
      console.table(user);
      
    })
    return users
  }
}

module.exports = PrintInfo
