'use strict'
const store = require('store')
const FUNCTIONS = require('../utils/Functions')

class Users {
  constructor(data) {
    this.userList = data
    store.set('userBackup', data)
    this.userList.map(user => {
      user.totalMoney = user.moneybox
    })
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
        "passengers":[]
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
      // ordenar para salir con hora anteriores y posteriores ///*&& userDateTimeTraveler >= dateTimeDriver*/-->y a el momento de salida del viaje
      // ordeno de menor a mayor tiempo, en caso de coincidencia, calculo la distancia
    usrOrderByPositionDate = userAllow.sort(FUNCTIONS.orderUsersByDateTimeAndDistance);
    return usrOrderByPositionDate;
  }

}

module.exports = Users


