'use-strict';

/* Fonction pour obtenir la position du soleil */
function getPositionSun(req, res) {
    var day, plat, plon, gmtdiff, azimuth, altitude;

    day = req.body.date +" "+req.body.time;
    plat = req.body.latitude;
    plon = req.body.longitude;
    gmtdiff = req.body.gmtdiff;

    console.log(day)
    console.log(plat)
    console.log(plon)
    console.log(gmtdiff)

    function to360range(num) {
        if (num > 360) return num - Math.floor(num / 360) * 360;
        else if (num < 0) return num + (Math.floor(-num / 360) + 1) * 360;
        else return num;
    }
    var inputDate = new Date();
    var test = new Date(day)
    day =
        Date.UTC(
            test.getFullYear(),
            test.getMonth(),
            test.getDate(),
            test.getHours(),
            test.getMinutes(),
            test.getSeconds()
        ) -
        gmtdiff * 60 * 60 * 1000;

    inputDate.setTime(day);
    var Y = inputDate.getFullYear();
    var M = inputDate.getMonth() + 1;
    var D = inputDate.getDate();

    var d =
        367 * Y -
        Math.floor((7 * (Y + Math.floor((M + 9) / 12))) / 4) +
        Math.floor((275 * M) / 9) +
        D -
        730530;

    //longitude of perihelion
    var w = 282.9404 + 4.70935 * Math.pow(10, -5) * d;
    //mean distance, a.u.
    var a = 1.0;
    //eccentricity
    var e = 0.016709 - 1.151 * Math.pow(10, -9) * d;
    //mean anomaly
    var M = to360range(356.047 + 0.9856002585 * d);
    //obliquity of the ecliptic
    var oblecl = 23.4393 - 3.563 * Math.pow(10, -7) * d;
    //mean longitude
    var L = to360range(w + M);

    //eccentric anomaly
    var E =
        M +
        (180 / Math.PI) *
        e *
        Math.sin((M * Math.PI) / 180) *
        (1 + e * Math.cos((M * Math.PI) / 180));

    //rectangular coordinates in the plane of the ecliptic, where the X axis points towards the perihelion
    var x = Math.cos((E * Math.PI) / 180) - e;
    var y = Math.sin((E * Math.PI) / 180) * Math.sqrt(1 - e * e);

    var r = Math.sqrt(x * x + y * y);
    var v = (180 / Math.PI) * Math.atan2(y, x);

    var lon = to360range(v + w);

    //ecliptic rectangular coordinates
    x = r * Math.cos((lon * Math.PI) / 180);
    y = r * Math.sin((lon * Math.PI) / 180);
    var z = 0.0;

    //rotate to equatorial coordinates
    var xequat = x;
    var yequat =
        y * Math.cos((oblecl * Math.PI) / 180) +
        z * Math.sin((oblecl * Math.PI) / 180);
    var zequat =
        y * Math.sin((oblecl * Math.PI) / 180) +
        z * Math.cos((oblecl * Math.PI) / 180);

    //convert to RA and Declination
    var RA = (180 / Math.PI) * Math.atan2(yequat, xequat);
    var Decl = (180 / Math.PI) * Math.asin(zequat / r);

    //Sidereal Time at the Greenwich meridian at 00:00 right now
    var GMST0 = L / 15 + 12;
    var UT = inputDate.getUTCHours() + inputDate.getUTCMinutes() / 60;
    var SIDTIME = GMST0 + UT + plon / 15;
    SIDTIME = SIDTIME - 24 * Math.floor(SIDTIME / 24);

    //hour angle
    var HA = to360range(15 * (SIDTIME - RA / 15));

    x = Math.cos((HA * Math.PI) / 180) * Math.cos((Decl * Math.PI) / 180);
    y = Math.sin((HA * Math.PI) / 180) * Math.cos((Decl * Math.PI) / 180);
    z = Math.sin((Decl * Math.PI) / 180);

    var xhor =
        x * Math.sin((plat * Math.PI) / 180) -
        z * Math.cos((plat * Math.PI) / 180);
    var yhor = y;
    var zhor =
        x * Math.cos((plat * Math.PI) / 180) +
        z * Math.sin((plat * Math.PI) / 180);

    azimuth = to360range(Math.atan2(yhor, xhor) * (180 / Math.PI) + 180);
    altitude = Math.asin(zhor) * (180 / Math.PI);

    res.status(200).send({_azimuth:azimuth, _altitude: altitude})

    console.log("azimuth", azimuth);
    console.log("elevacion", altitude);
}

module.exports={
    getPositionSun
}