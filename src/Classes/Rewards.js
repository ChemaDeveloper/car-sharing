'use strict';
let Users = require('../Classes/Users')
let users = new Users(require('../utils/baseData.json'))

class Rewards {
  constructor() {
  }

  addCoins(usernames, coins) {
    if (typeof(usernames) == 'object') {
      users.userList.map(user => {
        if (usernames.indexOf(user.username) > -1) {
          user.moneybox += Number(coins)
          user.totalMoney += Number(coins)
        }
        return user
      })
    } else if (typeof(usernames) == 'string') {
      let user = users.userList.filter(user => user.username === usernames)
      user.moneybox += Number(coins)
      user.totalMoney += Number(coins)
    }

    return users
  }

  removeCoins(usernames, coins) {
    if (typeof(usernames) == 'object') {
      users.userList.map(user => {
        if (usernames.indexOf(user.username) > -1) {
          user.moneybox -= Number(coins)
        }
        return user
      })
    } else if (typeof(usernames) == 'string') {
      let user = users.userList.filter(user => user.username === usernames)
      user.moneybox -= Number(coins)
    }

    return users
  }
}

module.exports = Rewards
