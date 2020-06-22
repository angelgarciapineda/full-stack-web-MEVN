/* LOGEMENT */
"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomeSchema = new Schema({
  name: String,
  rue: {
    type: String
  },
  codepostal: {
    type: String
  },
  ville: {
    type: String
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  }
});

module.exports = mongoose.model("Home", HomeSchema);