"use strict";

const jwt = require("jwt-simple");
const moment = require("moment");
const config = require("../config");

//Instalar npm install --save moment
function createToken(user) {
  const payload = {
    sub: user._id, //es el id que se crea en la bd
    iat: moment().unix(), //devuelve la fecha en que fue creado
    exp: moment().add(14, "days").unix(), //determinar una fecha de caducidad
    //se está indicando que son 14 días a partir de la creación
  };

  //return jwt.encode(payload, config.SECRET_TOKEN);
  return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token) {
  //promesas
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN);
      //verificar si ya caducó
      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: "Le token a expiré",
        });
      }
      resolve(payload.sub); //devuelve el token
    } catch (error) {
      reject({
        status: 500,
        message: "Token invalide",
      });
    }
  });
  return decoded;
}

module.exports = {
  createToken,
  decodeToken,
};
