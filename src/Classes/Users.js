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
    userToUpdate[0].position.lat = lat == null ? userToUpdate[0].position.lat : lat
    userToUpdate[0].position.lon = lon == null ? userToUpdate[0].position.lon : lon
    userToUpdate[0].route.userRol = userrol == null ? userToUpdate[0].route.userRol : userrol
    userToUpdate[0].seats = seats == null ? userToUpdate[0].seats : seats
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

  getUserOrderByTimeDistance(users, keyUser) {
    let dateTimeKey = FUNCTIONS.parseDateTime(keyUser.route.travelTime)
    let currentDate = new Date();//dateTime momento de la peticion

    let usersOrdered = []
    users.userList.forEach(user => {
      if (FUNCTIONS.parseDateTime(user.route.travelTime) >= currentDate) {
        usersOrdered.push({
          username: user.username,
          distance: parseFloat(FUNCTIONS.distance(keyUser.position, user.position)),
          gapTime: FUNCTIONS.parseDateTime(user.route.travelTime) - dateTimeKey,
          route: {
              userRol: user.route.userRol
          }
        })
      }
    })
    return usersOrdered.sort(FUNCTIONS.getSortMethod('+gapTime', '+distance'))
  }

    filterUsersByUserRol(allUsersOrdered, filter) {
        let usersOrderedFilter = [];
        allUsersOrdered.forEach( user => {
                if (user.route.userRol.toLowerCase() == filter.toLowerCase()) {
                    usersOrderedFilter.push({
                        username: user.username,
                        distance: user.distance,
                        gapTime: user.gapTime,
                        route: {
                            userRol: user.route.userRol
                        }
                    });
                }
            });

        return usersOrderedFilter;
    }


  fillCar(name){
      let strPassenger = 'Passenger';

      let driver = this.userList.filter( user => user.username == name )
      let allUsersOrderer = this.getUserOrderByTimeDistance(this, driver[0]);
      let passengersOrderer = this.filterUsersByUserRol(allUsersOrderer, strPassenger)

      passengersOrderer.forEach(passenger => {
          if(driver[0].route.passengers.length <  driver[0].seats){
              driver[0].route.passengers.push(passenger)
          }
      })
     return driver[0];
  }
//añadir pasajeros una sola vez en el viaje mas cercano
  fillCars(){
      let drivers = this.filterUsersByUserRol(this.userList, 'Driver');
      let fillDrivers = drivers.map(driver => this.fillCar(driver.username))
      return fillDrivers;
  }

  sortUsers(params) {
    console.log(this.userList.sort(FUNCTIONS.getSortMethod('+seats')))
      return this.userList.sort(FUNCTIONS.getSortMethod('+seats'));
  }



}

module.exports = Users
