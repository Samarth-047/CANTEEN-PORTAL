var express = require("express");
var router = express.Router();
// Load User model
const User = require("../models/buy");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    buy.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

router.post("/buy_reg", async (req, res) => {
    const newUser = new buy({
        item: req.body.item,
        price: req.body.price,
        canteen2:req.body.canteen2,
        quantity:req.body.quantity,
        total:req.body.total,
        add_on:req.body.add_on,
        status:req.body.status,
        email:req.body.email,
    });
    console.log(newUser);
    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

module.exports = router;