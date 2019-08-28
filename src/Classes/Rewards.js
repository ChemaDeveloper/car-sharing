'use strict';
var users = require('../utils/baseData.json')

class Rewards {
  constructor() {
  }

  addCoins(usernames, coins) {
    users.map(user => {
      if (usernames.indexOf(user.username) > -1) {
        user.moneybox += Number(coins)
      }
    })
    return users
  }

  removeCoins(usernames, coins) {
    users.map(user => {
      if (usernames.indexOf(user.username) > -1) {
        user.moneybox -= Number(coins)
      }
    })
    return users
  }
}

module.exports = Rewards
