const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();

const { readdirSync } = require("fs");

const connectDB = require("./config/db");

const app = express();

//connect database
connectDB();

//middle
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(cors());

//Route
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

app.listen(process.env.PORT, () => {
  console.log("server is runing on port", process.env.PORT);
});
