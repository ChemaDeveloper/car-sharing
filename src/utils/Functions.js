'use strict'

    const parseDateTime = (strDateTime)=>{
        let dayUser = strDateTime.substring(0,2);
        let monthUser = strDateTime.substring(3,5);
        let yearUser = strDateTime.substring(6,10);
        let hourUser = strDateTime.substring(11,13);
        let minutesUser = strDateTime.substring(14,16);
        let secondsUser = strDateTime.substring(17,19);
        let userDateTimeTraveler = new Date(yearUser, monthUser, dayUser, hourUser, minutesUser, secondsUser);

        return userDateTimeTraveler;
    }

    const calcDistance = (positionDriver, positionTraveler) =>{
            //pasar la latitud y longitud decimal a radianes y hacer el calculo
            let positionArrivalDriver = latLangToRadians(positionDriver);
            let ubicationArrivalTraveler = latLangToRadians(positionTraveler);
            const PI = Math.PI;
            const FI1 = positionArrivalDriver[0], LANDA1 = positionArrivalDriver[1];
            const FI2 = ubicationArrivalTraveler[0], LANDA2 = ubicationArrivalTraveler[1];

            // allow alternative ellipsoid to be specified
            const ellipsoid = this.datum ? this.datum.ellipsoid : {a: 6378137, b: 6356752.314245, f: 1 / 298.257223563};// LatLonEllipsoidal.ellipsoids.WGS84;
            const {a, b, f} = ellipsoid;
            const L = LANDA2 - LANDA1;
            const tanU1 = (1 - f) * Math.tan(FI1), cosU1 = 1 / Math.sqrt((1 + tanU1 * tanU1)), sinU1 = tanU1 * cosU1;
            const tanU2 = (1 - f) * Math.tan(FI2), cosU2 = 1 / Math.sqrt((1 + tanU2 * tanU2)), sinU2 = tanU2 * cosU2;
            let sinLanda = null, cosLanda = null, sinSigma = 0, cosSigma = 0, sinAlfa = null;
            let sinSqSigma = null, cosSqAlfa = 0, cos2SigmaM = 0, sigma = null, C = null;
            let alfa = L, alfa1, iterations = 0;
            const antimeridian = Math.abs(L) > PI;
            do {
                sinLanda = Math.sin(alfa);
                cosLanda = Math.cos(alfa);
                sinSqSigma = (cosU2 * sinLanda) * (cosU2 * sinLanda) + (cosU1 * sinU2 - sinU1 * cosU2 * cosLanda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLanda);
                if (Math.abs(sinSqSigma) < Number.EPSILON) break;  // co-incident points
                sinSigma = Math.sqrt(sinSqSigma);
                cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLanda;
                sigma = Math.atan2(sinSigma, cosSigma);
                sinAlfa = cosU1 * cosU2 * sinLanda / sinSigma;
                cosSqAlfa = 1 - sinAlfa * sinAlfa;
                cos2SigmaM = (cosSqAlfa != 0) ? (cosSigma - 2 * sinU1 * sinU2 / cosSqAlfa) : 0; // on equatorial line cos = 0 (6)
                C = f / 16 * cosSqAlfa * (4 + f * (4 - 3 * cosSqAlfa));
                alfa1 = alfa;
                alfa = L + (1 - C) * f * sinAlfa * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
                const iterationCheck = antimeridian ? Math.abs(alfa) - PI : Math.abs(alfa);
                if (iterationCheck > PI) throw new EvalError('alfa > PI');
            } while (Math.abs(alfa - alfa1) > 1e-12 && ++iterations < 1000);
            if (iterations >= 1000) throw new EvalError('La formula no converge');
            const uSq = cosSqAlfa * (a * a - b * b) / (b * b);
            const A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
            const B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
            const AlfaSIGMA = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
                B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
            const distanceMeters = b * A * (sigma - AlfaSIGMA);
            const distanceKm = (distanceMeters / 1000).toFixed(2);
            return distanceKm;
        }

    const latLangToRadians = (marcador) => {
        let lat = marcador['lat'];
        let lng = marcador['lon'];
        let xAbscisas = lat * Math.PI / 180;
        let yOrdenada = lng * Math.PI / 180;
        return [xAbscisas, yOrdenada];
    }

    const orderUsersByDateTimeAndDistance = (a,b) => {
        let order;
        if(a.gapTime > b.gapTime){
            order = 1;
        }else if(a.gapTime < b.gapTime){
            order = -1;
        }else{//misma fecha/ diferencio por distancia
            if(a.distanceKm > b.distanceKm){
                order = 1;
            }
            else if(a.distanceKm < b.distanceKm){
                order -1;
            }
            else{//distancia y fecha iguales, diferencia por el nombre ?
                order =0;
            }
        }
        return order;
    }

module.exports = {
    parseDateTime,
    calcDistance,
    orderUsersByDateTimeAndDistance
}