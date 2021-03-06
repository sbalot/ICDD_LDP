const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
var multer = require('multer');
var cors = require('cors');

const users = require("./routes/api/users");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:/PhD/Courses/FullStack/ICDD/hypergraphql_installation/hypergraphql_installation/src/main/resources') 
  },
  filename: function (req, file, cb) {
    cb(null, "ICDD.ttl" )

  }
})
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
