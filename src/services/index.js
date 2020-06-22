"use strict";

const jwt = require("jwt-simple");
const moment = require("moment");
const config = require("../config");

function createToken(user) {
  const payload = {
    sub: user._id, //L'ID c'est de la bd
    iat: moment().unix(), //renvoie la date
    exp: moment().add(14, "days").unix(), //définir une heure d'expiration
  };
  return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN);
      //Verifier si le token a déjà expiré
      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: "Le token a expiré",
        });
      }
      resolve(payload.sub); //renvoie le token
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