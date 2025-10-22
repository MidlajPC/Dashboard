const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbconnect = require("./config/dbconfig");
require("dotenv").config();
const userRoutes = require("./routes/user.routes");
const botRoutes = require("./routes/getBots.routes");
const userModel = require("./model/user.model");

const app = express();
app.use(cors({ origin: "https://dashboard-n6gm5orup-midlaj-pcs-projects.vercel.app", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(userRoutes);
app.use(botRoutes);

dbconnect();
app.listen(process.env.PORT, (err) => {
  console.log("server is running");
});
