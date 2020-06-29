"use strict";

const services = require("../services/index");
/* Fonction pour authentiquer à l'utilisateur */
function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({auth:false, message: "Tu n'as pas accès" });
  }
  const token = req.headers.authorization.split(" ")[1];

  services
    .decodeToken(token)
    .then((response) => {
      req.user = response;
      next();
    })
    .catch((response) => {
      res.status(response.status);
    });
}

module.exports = isAuth;