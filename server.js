const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const items = require("./routes/api/items");
// middleware for body parser
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//connect to mongo
mongoose
  .connect(db)
  .then(() => console.log("Connected to Mongo..."))
  .catch(e => console.log(e));
//use routes
app.use("/api/items", items);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
