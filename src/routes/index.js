"use strict";

const express = require("express");
const userController = require("../controllers/user");
const homeController = require("../controllers/home");
const sunController = require("../controllers/sun");

const api = express.Router();
const auth = require("../middlewares/auth");
//route pour s'inscrire
api.post("/signup", userController.signUp);
//route pour se connecter
api.post("/signin", userController.signIn);

//route pour enregistrer un logement de l'utilisateur
api.post("/home/:userId", userController.addHome);
//route pour obtenir un logement en particulier
api.get("/home/:homeId/:userId", userController.getHome);
//route pour obtenir tous les logements de l'utilisateur
api.get("/home/:userId", userController.getHomes);
//route pour modifier un logement en particulier
api.put("/home/:homeId", userController.updateHome);
//route pour supprimer un logement en particulier
api.delete("/home/:homeId/:userId", userController.deleteHome);

//route pour enregistrer un panneau dans un logement en particulier
api.post("/panel/:homeId", homeController.addPanel);
//route pour obtenir un panneau d'un logement en particulier
api.get("/panel/:panelId/:homeId", homeController.getPanel);
//route pour obtenir tous les panneaux d'un logement en particulier
api.get("/panel/:homeId", homeController.getPanels);
//route pour modifier un panneau en particulier
api.put("/panel/:panelId", homeController.updatePanel);
//route pour modifier les attributs d'azimuth et hauteur
api.put("/panel/:panelId/:homeId", homeController.updatePanelGeolocation);
//route pour supprimer un panneau en particulier
api.delete("/panel/:panelId/:homeId", homeController.deletePanel);

//route pour enregistrer un cible dans un logement en particulier
api.post("/target/:homeId", homeController.addTarget);
//route pour obtenir tous les cibles d'un logement en particulier
api.get("/target/:homeId", homeController.getTargets);
//route pour obtenir un cible d'un logement un particulier
api.get("/target/:targetId/:homeId", homeController.getTarget);
//route pour modifier un cible en particulier
api.put("/target/:targetId", homeController.updateTarget);
//route pour supprimer un cible d'un logement en particulier
api.delete("/target/:targetId/:homeId", homeController.deleteTarget);

//route pour enregistrer une plage horaire dans un logement en particulier
api.post("/timeslot/:homeId", homeController.addTimeSlot);
//route pour obtenir les panneaux et cibles d'un logement en particulier
api.get("/timeslot/panel/target/:homeId", homeController.getPanels_Targets);

//route pour obtenir la position du soleil
api.post("/position/sun", sunController.getPositionSun);

api.get("/private", auth, (req, res) => {
  res.status(200).send({ message: "Tienes acceso" });
});
module.exports = api;