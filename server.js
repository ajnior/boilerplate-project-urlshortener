require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const shorturl = require("./routes/shorturl");
const connectDB = require("./db/index");

// Basic Configuration
const port = process.env.PORT || 3000;

connectDB();

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.use("/api/shorturl", shorturl);

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.listen(port, function () {
  console.log(`Listening on http://localhost:${port}`);
});
