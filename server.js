const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const path = require('path')
const items = require("./routes/api/items");
// middleware for body parser
app.use(bodyParser.json());

//DB config
const db = require("./config/keys")
  .mongoURI;

//connect to mongo
mongoose
  .connect(db)
  .then(() => console.log("Connected to Mongo..."))
  .catch(e => console.log(e));
//use routes
app.use("/api/items", items);

//SErv static assets if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

}
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));