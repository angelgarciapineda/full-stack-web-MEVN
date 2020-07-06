/* PANNEAUX */
"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PanelSchema = new Schema({
  name: {type: String},
  azimuth: {
    type: Number ,
    default: 0.1
  },
  elevation: {
    type: Number,
    default: 0.1
  },
  latitude:{
    type: String
  },
  longitude:{
    type:String
  }
});

module.exports = mongoose.model("Panel", PanelSchema);
