'use strict'
const store = require('store')
const FUNCTIONS = require('../utils/Functions')

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

  getUserOrderByTimeDistance(users, positionDriver, dateTimeDr) {
    let latLongDriver = JSON.parse(positionDriver)
    let dateTimeDriver = FUNCTIONS.parseDateTime(dateTimeDr)
    let usrOrderByPositionDate=[];//usuraios ordenador por hora salida y distancia
    let userAllow=[];
    let dateMoment = new Date();//dateTime momento de la peticion
    //creo un array con los viajeros
    for(let i = 0;i < users.userList.length ;i++){
      let userDateTimeTraveler = FUNCTIONS.parseDateTime(users.userList[i].route.travelTime);
      if(userDateTimeTraveler >= dateMoment //fecha salida mayor o igual a el momento de la peticion,
          && users.userList[i].route.userRol == 'Passenger' //solo pasajeros
          && users.userList[i].route.passengers.length < users.userList[i].seats){//Al conductor debe quedarle hueco.
          //calcular la distancia de cada usuario y añadirla en el nuevo array
          let distanceArrivalsPoints = FUNCTIONS.calcDistance(latLongDriver, users.userList[i].position);
          let gapTime = userDateTimeTraveler - dateTimeDriver; //milisegundos (horas /1000/60/60)
        //array con posibles pasajeros para ordenar por tiempo y distancia
        userAllow.push(users.userList[i])
          userAllow[userAllow.length-1].distanceKm = parseFloat(distanceArrivalsPoints)
          userAllow[userAllow.length-1].gapTime=gapTime;//milisegundos
      }
    }
      // ordenar para salir con hora anteriores y posteriores ///*&& userDateTimeTraveler >= dateTimeDriver*/-->y a el momento de salida del viaje
      // ordeno de menor a mayor tiempo, en caso de coincidencia, calculo la distancia
    usrOrderByPositionDate = userAllow.sort(FUNCTIONS.orderUsersByDateTimeAndDistance);
    return usrOrderByPositionDate;
  }

}

module.exports = Users
