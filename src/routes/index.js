"use strict";

const express = require("express");
const panelController = require("../controllers/panel");
const userController = require("../controllers/user");
const api = express.Router();
const auth = require("../middlewares/auth");

api.get("/panel", panelController.getPanels);
api.get("/panel/:panelId", panelController.getPanel);
api.post("/panel", panelController.savePanel);
api.put("/panel/:panelId", panelController.updatePanel);
api.delete("/panel/:panelId", panelController.deletePanel);
api.post("/signup", userController.signUp);
api.post("/signin", userController.signIn);
api.post("/casa", userController.addHome);
api.get("/private", auth, (req, res) => {
  res.status(200).send({ message: "Tienes acceso" });
});
module.exports = api;