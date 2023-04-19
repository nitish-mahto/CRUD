const express = require("express");
const app = express();
const PORT = process.env.PORT || 8002;
require("./connection/db");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./src/router/users.routes");

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http//localhost:${PORT}`);
});
