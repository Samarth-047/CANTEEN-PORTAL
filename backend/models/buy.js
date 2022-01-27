const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const buyschema = new Schema({
	name: {
		type: String,
		required: false
	},
	item: {
		type: String,
		required: false
	},
	batch: {
		type: String,
		required: false
	},
	age: {
		type: String,
		required: false
	},
	price: {
		type: String,
		required: false
	},
	canteen2: {
		type: String,
		required: false
	},
	quantity: {
		type: String,
		required: false
	},
	total: {
		type: String,
		required: false
	},
	add_on: {
		type: String,
		required: false
	},
	status: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: false
	},
});


module.exports = buy = mongoose.model("buy", buyschema);
