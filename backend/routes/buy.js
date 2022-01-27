var express = require("express");
var router = express.Router();
// Load User model
const buy = require("../models/buy");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    buy.find(function (err, users) {
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
        name: req.body.name,
        canteen2: req.body.canteen2,
        quantity: req.body.quantity,
        total: req.body.total,
        add_on: req.body.add_on,
        status: req.body.status,
        email: req.body.email,
        age: req.body.age,
        batch: req.body.batch,
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
router.post("/status_update", (req, res) => {
    var id = req.body.id;
    var status = req.body.status;
    var st=req.body;
    console.log(req.body);
    // Find user by email
    buy.findOneAndUpdate({_id: id }, 
        {status:status}, null, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Original Doc : ",docs);
            res.status(200).json(st);
        }
    });
});

module.exports = router;