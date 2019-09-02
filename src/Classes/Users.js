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

    let usersOrdered = [];
    users.userList.forEach(user => {
      if (FUNCTIONS.parseDateTime(user.route.travelTime) >= currentDate) {
        usersOrdered.push({
          username: user.username,
          distance: parseFloat(FUNCTIONS.distance(keyUser.position, user.position)),
          gapTime: FUNCTIONS.parseDateTime(user.route.travelTime) - dateTimeKey,
          route: {
              userRol: user.route.userRol,
              travelTime: user.route.travelTime
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
                            userRol: user.route.userRol,
                            travelTime: user.route.travelTime
                        }
                    });
                }
            });
        return usersOrderedFilter;
    }


  fillCar(name) {
      let strPassenger = 'Passenger';
      let currentDriver = this.userList.filter(user => user.username == name)
      let allUsersOrderer = this.getUserOrderByTimeDistance(this, currentDriver[0]);
      let passengersOrderer = this.filterUsersByUserRol(allUsersOrderer, strPassenger)
      let drivers = this.userList.filter(user => user.route.userRol.toLowerCase() === 'driver')

      passengersOrderer.forEach(passenger => {
          let isInCar = drivers.filter(driver =>  driver.route.passengers.filter(iterPassenger => iterPassenger.username.indexOf(passenger.username) > -1).length > 0 )
          if (currentDriver[0].route.passengers.length < currentDriver[0].seats && isInCar.length === 0) {
              currentDriver[0].route.passengers.push(passenger)
          }
      })
      return currentDriver[0];
  }

  //añadir pasajeros una sola vez en el viaje mas cercano (llenar coche a partir de los conductor)
  fillCars(){
      let drivers = this.filterUsersByUserRol(this.userList, 'Driver');
      let fillDrivers = drivers.map(driver => this.fillCar(driver.username))
      return fillDrivers;
  }

  //llenar coches dependiendo de cada pasajero
    passengersFillCars(){
      let passengers = this.filterUsersByUserRol(this.userList, 'Passenger')
      let nameDrivers = this.filterUsersByUserRol(this.userList, 'Driver');
      let drivers = {
          userList:[]
      };
        nameDrivers.forEach(driver => {
            drivers.userList.push(this.readbyUser(driver.username)[0]);
        })
        passengers.forEach(passenger => {
                let currentPassenger = this.readbyUser(passenger.username)[0];
                let driversOrderer = this.getUserOrderByTimeDistance(drivers, currentPassenger);
                let i = 0;
                let driver;
                do {
                    driver = this.readbyUser(driversOrderer[i].username)[0];
                        if(driver.seats > driver.route.passengers.length){
                            this.addPassengerToCarDriver(currentPassenger, driver)
                        }
                        ++i;
                }
                while(driver.seats > 0 && driversOrderer[i].length < i && driver.route.passengers.length < driver.seats)
            }
        )
        return this.userList;
    }

    addPassengerToCarDriver(passenger, driver){
        driver.route.passengers.push(passenger);
    }

    driverFillBank(){
      let users = this.passengersFillCars();
      users.forEach( user => {
            if(user.route.userRol.toLowerCase() == "driver"){
                //sumar una moneda x cada pasajero
               user.moneybox += user.route.passengers.length;
                //eliminar pasajeros
               user.route.passengers = [];
                //cambiar fecha viaje al siguiente dia de diario
                let newDateNextTrip = this.changeDateNextTrip(user);
                //actualizar string nueva fecha
                user.route.travelTime = newDateNextTrip;
            }
          }
      );
      return users;
    }
        //fecha del siguiente dia habil (sin contemplar festivos)
    changeDateNextTrip(driver){
        let dateTripMadeUpDriver = FUNCTIONS.parseDateTime(driver.route.travelTime);
        let dayOfDate = dateTripMadeUpDriver.getDay();
        let dateDay = dateTripMadeUpDriver.getDate();
        if(dayOfDate==5){
            dateTripMadeUpDriver.setDate(dateDay+3);
        }else if(dayOfDate == 6){
            dateTripMadeUpDriver.setDate(dateDay+2);
        }
        else{
            dateTripMadeUpDriver.setDate(dateDay+1);
        }
        let strDate = FUNCTIONS.dateToString(dateTripMadeUpDriver);

      return strDate;
    }


  sortUsers(params) {
    console.log(this.userList.sort(FUNCTIONS.getSortMethod('+seats')))
      return this.userList.sort(FUNCTIONS.getSortMethod('+seats'));
  }



}

module.exports = Users
