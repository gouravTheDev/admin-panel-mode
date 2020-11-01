var express = require("express");
var router = express.Router();
var User = require("../models/user");
var middleware = require("../middleware");

router.get("/users", middleware.isLoggedIn, (req, res) => {
  User.find({ deleted: false }, (err, allUsers) => {
    if (err) {
      // console.log(err);
    } else {
      res.render("users", { allUsers: allUsers, currentUser: req.user });
    }
  });
});

router.get("/users/:id/edit", middleware.isLoggedIn, (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    res.render("edituser", { user: foundUser, currentUser: req.user });
  });
});

router.put("/users/:id/edit", middleware.isLoggedIn, (req, res) => {
  console.log(req.body);
  User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, updatedUser) => {
      if (err) {
        res.redirect("/users");
      } else {
        req.flash("success", "The user data is updated");
        res.redirect("/users/" + req.params.id + "/edit");
      }
    }
  );
});

router.put("/users/:id/changestatus", middleware.isLoggedIn, (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, updatedUser) => {
      if (err) {
        req.flash("error", "Status can't be upated");
        res.redirect("/users");
      } else {
        req.flash("success", "The user status is upated");
        res.redirect("/users/" + req.params.id + "/edit");
      }
    }
  );
});

router.put("/users/:id/softdelete", middleware.isLoggedIn, (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $set: { deleted: true } },
    { new: true, useFindAndModify: false },
    (err, updatedUser) => {
      if (err) {
        req.flash("error", "Status can't be upated");
        res.redirect("/users");
      } else {
        req.flash("success", "The user record is upated");
        res.redirect("/users/" + req.params.id + "/edit");
      }
    }
  );
});

//Search Routes

router.post("/users/searchbyfirstname", middleware.isLoggedIn, (req, res) => {
  User.find({
    firstName: { $regex: new RegExp(req.body.firstName, "i") },
  }).exec((err, users) => {
    if (err) {
      req.flash("error", "No users found!");
    } else {
      res.render("users", { allUsers: users, currentUser: req.user });
    }
  });
});

router.post("/users/searchbylastname", middleware.isLoggedIn, (req, res) => {
  User.find({ lastName: { $regex: new RegExp(req.body.lastName, "i") } }).exec(
    (err, users) => {
      if (err) {
        req.flash("error", "No users found!");
      } else {
        res.render("users", { allUsers: users, currentUser: req.user });
      }
    }
  );
});

router.post("/users/searchbyemail", middleware.isLoggedIn, (req, res) => {
  User.find({ email: req.body.email }).exec((err, users) => {
    if (err) {
      req.flash("error", "No users found!");
    } else {
      res.render("users", { allUsers: users, currentUser: req.user });
    }
  });
});

router.post("/users/searchbystatus", middleware.isLoggedIn, (req, res) => {
  User.find({
    status: { $regex: new RegExp(req.body.status, "i") },
  }).exec((err, users) => {
    if (err) {
      req.flash("error", "No users found!");
    } else {
      res.render("users", { allUsers: users, currentUser: req.user });
    }
  });
});

module.exports = router;
