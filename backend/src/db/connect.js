const mongoose = require("mongoose");
module.exports = connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/multiapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
    });
    console.log("connected to mongodb");
  } catch (error) {
    console.error(error);
  }
};
