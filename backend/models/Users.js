const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: false
	},
	contact_number: {
		type: String,
		required: false
	},
	type: {
		type: String,
		required: false
	},
	year: {
		type: String,
		required: false
	},
	age: {
		type: String,
		required: false
	},
	batch_number: {
		type: String,
		required: false
	},
	manager_name: {
		type: String,
		required: false
	},
	canteen: {
		type: String,
		required: false
	},
	canteen_open: {
		type: String,
		required: false
	},
	canteen_close: {
		type: String,
		required: false
	},
	password: {
		type: String,
		required: false
	},
	wallet: {
		type: String,
		required: false
	},
});


module.exports = User = mongoose.model("Users", UserSchema);
