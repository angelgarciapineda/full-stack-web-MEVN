"use strict";

const express = require("express");
const userController = require("../controllers/user");
const homeController = require("../controllers/home");
const sunController = require("../controllers/sun");

const api = express.Router();
const auth = require("../middlewares/auth");

api.post("/signup", userController.signUp);
api.post("/signin", userController.signIn);

api.post("/home/:userId", userController.addHome);
api.get("/home/:homeId/:userId", userController.getHome);
api.get("/home/:userId", userController.getHomes);
api.put("/home/:homeId", userController.updateHome);
api.delete("/home/:homeId/:userId", userController.deleteHome);

api.post("/panel/:homeId", homeController.addPanel);
api.get("/panel/:panelId/:homeId", homeController.getPanel);
api.get("/panel/:homeId", homeController.getPanels);
api.put("/panel/:panelId", homeController.updatePanel);
api.delete("/panel/:panelId/:homeId", homeController.deletePanel);

api.post("/target/:homeId", homeController.addTarget);
api.get("/target/:homeId", homeController.getTargets);
api.get("/target/:targetId/:homeId", homeController.getTarget);
api.put("/target/:targetId", homeController.updateTarget);
api.delete("/target/:targetId/:homeId", homeController.deleteTarget);

api.post("/timeslot/:homeId", homeController.addTimeSlot);
api.get("/timeslot/panel/target/:homeId", homeController.getPanels_Targets);

api.post("/position/sun", sunController.getPositionSun);

api.get("/private", auth, (req, res) => {
  res.status(200).send({ message: "Tienes acceso" });
});
module.exports = api;