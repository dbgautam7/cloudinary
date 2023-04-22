const mongoose = require("mongoose");

const AudioSchema = new mongoose.Schema({
  audio: {
    type: String,
    required: true,
  },
});

const Audio = mongoose.model("Upload", AudioSchema);

module.exports = Audio;
