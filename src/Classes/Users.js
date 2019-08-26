'use strict'
const store = require('store')

class Users {
  constructor(data) {
    this.userList = data
    store.set('userBackup', data)
  }

  restartUserList() {
    this.userList = store.get('userBackup')
  }

}

module.exports = Users
