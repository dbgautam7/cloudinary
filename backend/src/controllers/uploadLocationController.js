const Location = require("../models/Location");

const postLocation = async (req, res, next) => {
  console.log(req.body, "===line 4");
  try {
    const data = await Location.create(req.body);
    console.log(data, "=====7");
    if (data) {
      res.status(201).json({ msg: "Location Data created Successfully", data });
    } else {
      res.status(401).json({ msg: "something went worng" });
    }
  } catch (error) {
    next(error);
  }
};

exports.postLocation = postLocation;
