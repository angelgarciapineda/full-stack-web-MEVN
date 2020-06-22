/* PLAGES HORAIRES */
"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimeSlotSchema = new Schema({
    name: { type: String },
    startdate: { type: Date },
    enddate: { type: Date },
    starttime: { type: Date },
    endtime: { type: Date },
    days: [{
        day: String
    }]
})
module.exports = mongoose.model("TimeSlot", TimeSlotSchema);