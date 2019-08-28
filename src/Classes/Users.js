'use strict'
const store = require('store')
const FUNCTIONS = require('../utils/Functions')

class Users {
  constructor(data) {
    this.userList = data
    store.set('userBackup', data)
  }

  restartUserList() {
    this.userList = store.get('userBackup')
  }

  createUser(name, position, seats, userRol) {
    this.userList.push({
      "position": {
        "lat": position.lat,
        "lon":position.lon
      },
      "route": {
        "travelTime":"22/08/2019 08:00:00",
        "userRol": userRol,
        "passengers":[]
      },
      "moneybox":"5",
      "seats": seats,
      "username": name
    })
  }


  getUserOrderByTimeDistance(users, positionDriver, dateTimeDriver) {
    let usrOrderByPositionDate=[];//usuraios ordenador por hora salida y distancia
    let userAllow=[];
    let dateMoment = new Date();//dateTime momento de la peticion

    //creo un array con los viajeros
    for(let i = 0;i < users.length ;i++){
      let userDateTimeTraveler = FUNCTIONS.parseDateTime(users[i].route.travelTime);
      if(userDateTimeTraveler >= dateMoment //fecha salida mayor o igual a el momento de la peticion,
          && users[i].route.userRol == 'Passenger' //solo pasajeros
          && users[i].route.passengers.length < users[i].seats){//Al conductor debe quedarle hueco.
        //creo un array con los posibles pasajeros
        userAllow.push(users[i])
        // ordenar para salir con hora anteriores y posteriores ///*&& userDateTimeTraveler >= dateTimeDriver*/-->y a el momento de salida del viaje
      // ordeno de menor a mayor tiempo, en caso de coincidencia, calculo la distancia
      }
    }
    usrOrderByPositionDate = userAllow.sort(FUNCTIONS.orderUsersByDateTimeAndDistance);
    debugger;
    return usrOrderByPositionDate;
  }

}

module.exports = Users
