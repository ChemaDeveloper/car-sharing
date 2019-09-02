'use strict'
let Users = require('../Classes/Users')
let users = new Users(require('../utils/baseData.json'))
const FUNCTIONS = require ('../utils/Functions')

class PrintInfo {
  constructor() {
  }

  
  showInfo() {
    const keyUser = {
      "position": {
        "lat":"41.234567",
        "lon":"-3.456789"
      },
      "route": {
        "travelTime":"30/08/2019 08:00:00",
        "userRol":"Fly",
        "Passengers":[]
      },
      "moneybox": 100,
      "seats": "1",
      "username": "PatoAlAparato"
    };
    let prettyUserList = [];
    users.userList.forEach(user =>{
      let distancia = parseFloat(FUNCTIONS.distance(keyUser.position, user.position));
      let time = FUNCTIONS.parseDateTime(user.route.travelTime) - FUNCTIONS.parseDateTime(keyUser.route.travelTime);
      prettyUserList.push({
        username: user.username,
        distance: distancia,
        gapTime: time,
        userRol: user.route.userRol
      })
    })
    return prettyUserList;
  }
}



module.exports = PrintInfo
