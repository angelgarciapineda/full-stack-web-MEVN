/* PLAGES HORAIRES */
"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimeSlotSchema = new Schema({
  name: { type: String },
  startdate: { type: Date},
  enddate: { type: Date },
  starttime: { type: String },
  endtime: { type: String },
  days: [{
    type: String
  }],
  panel: {
    type: Schema.Types.ObjectId, ref: 'Panel', require: false
  },
  target: {
    type: Schema.Types.ObjectId, ref: 'Target', require: false
  }
})
module.exports = mongoose.model("TimeSlot", TimeSlotSchema);