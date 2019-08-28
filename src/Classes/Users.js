'use strict'
const store = require('store')

class Users {
  constructor(data) {
    this.userList = data
    store.set('userBackup', data)
    store.set()
  }

  restartUserList() {
    this.userList = store.get('userBackup')
  }

  createUser(name, position, seats, userRol) {
    this.userList.push({
      "position": {
        "lat": position,
        "lon":"-3.781526"
      },
      "route": {
        "travelTime":"22/08/2019 08:00:00",
        "userRol": userRol,
        "pasengers":[]
      },
      "moneybox":"5",
      "seats": seats,
      "username": name
    })
  }

}

module.exports = Users
