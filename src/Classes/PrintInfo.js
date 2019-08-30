'use strict'
let Users = require('../Classes/Users')
let users = new Users(require('../utils/baseData.json'))

class PrintInfo {
  constructor() {
  }
  showInfo() {
    debugger;
    let orderedUsers = users.getUserOrderByTimeDistance(users, {
        position: JSON.parse(req.body.position), 
        route: {
          travelTime: req.body.fecha
        }
    })
    console.log(orderedUsers);
    debugger;
      let travel = new Array;
      let nearest = new Array;
      users.userList.map(user => {
        let usr = user.travelTime
        let key = keyUser.travelTime
        nearest.short(function(usr, key){return usr - key})
          user.moneybox += Number(coins)
          user.totalMoney += Number(coins)
       
        return user
      })
    }

}

module.exports = PrintInfo
