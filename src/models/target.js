/* CIBLES */
"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TargetSchema = new Schema({
    name: { type: String },
    latitude: { type: String },
    longitude: { type: String }

})
module.exports = mongoose.model("Target", TargetSchema);