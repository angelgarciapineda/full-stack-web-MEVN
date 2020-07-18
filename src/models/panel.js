/* PANNEAUX */
"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PanelSchema = new Schema({
  name: {type: String},
  azimuth: {
    type: Number ,
  },
  elevation: {
    type: Number,
  },
  latitude:{
    type: String
  },
  longitude:{
    type:String
  }
});

module.exports = mongoose.model("Panel", PanelSchema);
