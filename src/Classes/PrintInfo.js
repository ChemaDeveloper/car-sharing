'use strict'
let Users = require('../Classes/Users')
let users = new Users(require('../utils/baseData.json'))
const FUNCTIONS = require ('../utils/Functions')

class PrintInfo {
  constructor() {
  }


  showInfo() {
    debugger;
    console.log(users.userList.sort(FUNCTIONS.getSortMethod('+seats')))
/*
  getUserOrderByTimeDistance(users, keyUser) {
    let dateTimeKey = FUNCTIONS.parseDateTime(keyUser.route.travelTime)
    let currentDate = new Date();//dateTime momento de la peticion

    let usersOrdered = []
    this.userList.forEach(user => {
      if (FUNCTIONS.parseDateTime(user.route.travelTime) >= currentDate) {
            usersOrdered.push({
              username: user.username,
              distance: parseFloat(FUNCTIONS.calcDistance(keyUser.position, user.position)),
              gapTime: FUNCTIONS.parseDateTime(user.route.travelTime) - dateTimeKey,
              userRol: user.route.userRol
            })
          }
    })
    return usersOrdered.sort(FUNCTIONS.orderUsersByDateTimeAndDistance)
  }
*/
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
