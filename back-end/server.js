const express = require("express");
const cors = require("cors");
const dbconnect = require("./config/dbconfig");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "https://localhost:5173", credentials: true }));
app.use(express.json());

dbconnect();
app.listen(process.env.PORT, (err) => {
  console.log("server is running");
});
