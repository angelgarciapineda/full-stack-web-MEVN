/* LOGEMENT */
"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomeSchema = new Schema({
  name: {type:String},
  street: {type: String},
  postalcode: {type: String},
  city: {type: String},
  latitude: {type: String},
  longitude: {type: String},
  panels:[{
    type: Schema.Types.ObjectId, ref: 'Panel', require:false
  }],
  targets:[{
    type: Schema.Types.ObjectId, ref: 'Target', require:false
  }],
  time_slots:[{
    type: Schema.Types.ObjectId, ref: 'TimeSlot', require:false
  }]
});

module.exports = mongoose.model("Home", HomeSchema);