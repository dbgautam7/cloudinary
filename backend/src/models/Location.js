const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
