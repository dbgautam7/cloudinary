const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
});

const Location = mongoose.model("Address", AddressSchema);

module.exports = Location;
