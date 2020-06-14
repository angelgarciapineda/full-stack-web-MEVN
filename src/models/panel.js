"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PanelSchema = new Schema({
  name: String,
  azimut: {type: Number, default: 0},
  elevation: {type: Number, default: 0},
  description: String,
});

module.exports = mongoose.model("Panel", PanelSchema);
