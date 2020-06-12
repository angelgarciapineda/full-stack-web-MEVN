"use strict";

const services = require("../services/index");

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({auth:false, message: "No tienes autorización" });
  }

  //en caso de que si exista la cabecera
  const token = req.headers.authorization.split(" ")[1];

  services
    .decodeToken(token)
    .then((response) => {
      req.user = response;
      next(); //pasamos al siguiente middleware
    })
    .catch((response) => {
      res.status(response.status);
    });
}

module.exports = isAuth;