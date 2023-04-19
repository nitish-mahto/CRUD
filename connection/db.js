const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/nitish")
  .then(() => {
    console.log("Connection established");
  })
  .catch((err) => {
    console.log("Error in connection", err.message());
  });