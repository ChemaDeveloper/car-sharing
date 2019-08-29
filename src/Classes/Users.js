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
    return this.userList
  }
  readAll(){
    return this.userList
  }
  readbyUser(name){
    return this.userList.filter((user) => user.username == name)
  }
  
  updateUser(username, lat, lon, userrol, seats){
    let userToUpdate = this.readbyUser(username)
    userToUpdate[0].position.lat = lat;
    userToUpdate[0].position.lon = lon;
    userToUpdate[0].route.userRol = userrol;
    userToUpdate[0].seats = seats;
    return userToUpdate;
  }
  deleteUser(username) {
    this.userList = this.userList.filter (it =>{
      if (it.username !== username) {
        return it;
      }
    })
    return this.userList
  }
  sortUsers(params) {
    console.log(this.userList.sort(this.getSortMethod('+seats')))
  }

  getSortMethod(){
    var _args = Array.prototype.slice.call(arguments)
    return (a, b) => {
        for(let x in _args){
            let ax = a[_args[x].substring(1)]
            let bx = b[_args[x].substring(1)]
            let cx

            ax = typeof ax == "string" ? ax.toLowerCase() : ax / 1
            bx = typeof bx == "string" ? bx.toLowerCase() : bx / 1

            if(_args[x].substring(0,1) == "-"){cx = ax; ax = bx; bx = cx;}
            if(ax != bx){return ax < bx ? -1 : 1;}
        }
    }
  }

  getDrivers() {
    return users.userList.filter(user => user.route.userRol.toLowerCase() == "driver")
  }

}

module.exports = Users


