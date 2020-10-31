var express = require("express");
var router = express.Router();
var User = require("../models/user");
var middleware = require("../middleware");

router.get("/users", middleware.isLoggedIn, (req, res) => {
	
	User.find({}, (err, allUsers) => {
		if(err){
			console.log(err);
		}else{
			res.render("users", {campgrounds:allUsers, currentUser: req.user});
		}
	});
	
});


router.get("/campgrounds/new", middleware.isLoggedIn, (req, res) =>{
	res.render("campgrounds/new.ejs");
})

router.get('/campgrounds/:id', (req, res) => {
	Campground.findById(req.params.id).populate("comments").exec((err, foundCamp) => {
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/shows.ejs", {campground: foundCamp});
		}
	})
	
})

router.get("/users/:id/edit", middleware.isLoggedIn, (req, res) =>{
	User.findById(req.params.id, (err, foundUser) => {
		res.render("edituser", {user: foundUser});
	})
})

router.put("/users/:id/edit", middleware.isLoggedIn, (req, res) =>{
	User.findByIdAndUpdate(req.params.id, req.body.user, (err, updatedUser)=>{
		if(err){
			res.redirect("/users");
		}else{
			req.flash("success", "The user data is updated");
			res.redirect("/users");
		} 
	})
})

router.put("/users/:id/changestatus", middleware.isLoggedIn, (req, res) =>{
	User.findByIdAndUpdate(req.params.id, req.body.user, (err, updatedUser)=>{
		if(err){
			req.flash("error", "Status can't be upated");
			res.redirect("/users");
		}else{
			req.flash("success", "The user status is upated");
			res.redirect("/users");
		}
	})
});

router.put("/users/:id/softdelete", middleware.isLoggedIn, (req, res) =>{
	User.findByIdAndUpdate(req.params.id, req.body.user, (err, updatedUser)=>{
		if(err){
			req.flash("error", "Status can't be upated");
			res.redirect("/users");
		}else{
			req.flash("success", "The user status is upated");
			res.redirect("/users");
		}
	})
});


module.exports = router;