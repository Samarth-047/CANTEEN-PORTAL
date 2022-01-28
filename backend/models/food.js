const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Foodschema = new Schema({
	item: {
		type: String,
		required: false
	},
	price: {
		type: String,
		required: false
	},
	rating: {
		type: String,
		required: false
	},
	type: {
		type: String,
		required: false
	},
	canteen1: {
		type: String,
		required: false,
	},
	food_tags: {
		type: String,
		required: false,
	},
	add_on1: {
		type: String,
		required: false
	},
	add_on2: {
		type: String,
		required: false
	},
	add_on3: {
		type: String,
		required: false
	},
	add_on4: {
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
});


module.exports = food = mongoose.model("food", Foodschema);
