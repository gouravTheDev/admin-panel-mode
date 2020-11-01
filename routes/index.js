var express = require("express");
var router = express.Router();
const passport = require("passport");
const User = require("../models/user");
var Admin = require("../models/admin");

router.get("/", (req, res) => {
  res.render("landing");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/users",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You have been Logged out");
  res.redirect("/login");
});

module.exports = router;
