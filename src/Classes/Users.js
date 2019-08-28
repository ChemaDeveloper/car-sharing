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

  createUser(name, lat, lon, seats, userRol){
    this.userList.push({
      "position": {
        "lat": lat,
        "lon":lon
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
  readAll(){
    this.userList.find()
  }
  readbyUser(name){
    this.userList.find()
  }
  updateUser(name, lat, lon, seats, userRol){
    this.userList.push({
      "position": {
        "lat": lat,
        "lon":lon
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
  deleteUser(name) {
    this.userList.delete(name);
}
}

module.exports = Users
