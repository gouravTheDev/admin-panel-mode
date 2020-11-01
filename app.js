// 3rd Party Modules
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");

// Model

var Admin = require("./models/admin");

// Routes

const adminRoutes = require("./routes/adminRoutes");
const indexRoutes = require("./routes/index");

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(
  require("express-session")({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.admin;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(indexRoutes);
app.use(adminRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
