'use strict';
let Users = require('../Classes/Users')
let users = new Users(require('../utils/baseData.json'))

class Rewards {
  constructor() {
  }

  addCoins(usernames, coins) {
    users.userList.map(user => {
      if (usernames.indexOf(user.username) > -1) {
        user.moneybox += Number(coins)
      }
    })
    return users
  }

  removeCoins(usernames, coins) {
    users.userList.map(user => {
      if (usernames.indexOf(user.username) > -1) {
        user.moneybox -= Number(coins)
      }
    })
    return users
  }
}

module.exports = Rewards
