const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	address: String,
	state: String,
	city: String,
	country: String,
	phone: String,
	dob: String,
	status: String,
	deleted: Boolean,
},{ timestamps: true });
module.exports = mongoose.model("User", userSchema);