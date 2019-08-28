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
