"use strict";

const express = require("express");
const panelController = require("../controllers/panel");
const userController = require("../controllers/user");
const homeController = require("../controllers/home");
const sunController = require("../controllers/sun");

const api = express.Router();
const auth = require("../middlewares/auth");

/* api.get("/panel", panelController.getPanels);
api.get("/panel/:panelId", panelController.getPanel);
api.post("/panel", panelController.savePanel);
api.put("/panel/:panelId", panelController.updatePanel);
api.delete("/panel/:panelId", panelController.deletePanel); */
api.post("/signup", userController.signUp);
api.post("/signin", userController.signIn);

api.post("/home/:userId", userController.addHome);
api.get("/home/:userId", userController.getHomes);
api.delete("/home/:homeId", userController.deleteHome);

api.post("/panel/:homeId", homeController.addPanel);
api.get("/panel/:homeId", homeController.getPanels);

api.post("/target/:homeId", homeController.addTarget);
api.get("/target/:homeId", homeController.getTargets);

api.post("/position/sun", sunController.getPositionSun);

api.get("/private", auth, (req, res) => {
  res.status(200).send({ message: "Tienes acceso" });
});
module.exports = api;