'use strict'

    const parseDateTime = (strDateTime) => {
        let dayUser = strDateTime.substring(0,2);
        let monthUser = strDateTime.substring(3,5);
        let yearUser = strDateTime.substring(6,10);
        let hourUser = strDateTime.substring(11,13);
        let minutesUser = strDateTime.substring(14,16);
        let secondsUser = strDateTime.substring(17,19);
        let splittedTime = strDateTime.split(/(:| |\/)/)
        let userDateTimeTraveler = new Date(yearUser, monthUser, dayUser, hourUser, minutesUser, secondsUser);

        return userDateTimeTraveler;
    }

    function distance(position1, position2) {
      if ((position1.lat == position2.lat) && (position1.lon == position2.lon)) {
        return 0
      } else {
        let radlat1 = Math.PI * position1.lat/180
        let radlat2 = Math.PI * position2.lat/180
        let theta = position1.lon - position2.lon
        let radtheta = Math.PI * theta/180
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
        if (dist > 1) {
    	     dist = 1
        }
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515 * 1.609344
        return dist.toFixed(3)
      }
    }

    function getSortMethod() {
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

module.exports = {
    parseDateTime,
    getSortMethod,
    distance
}
