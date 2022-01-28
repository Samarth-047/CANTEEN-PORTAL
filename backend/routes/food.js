var express = require("express");
var router = express.Router();
// Load User model
const food = require("../models/food");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    food.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a food to db
router.post("/foodadd", async (req, res) => {
    const newUser = new food({
        item: req.body.item,
        price: req.body.price,
        rating: req.body.rating,
        type:req.body.type,
        canteen1:req.body.canteen1,
        food_tags:req.body.food_tags,
        add_on1:req.body.add_on1,
        add_on2:req.body.add_on2,
        add_on3:req.body.add_on3,
        add_on4:req.body.add_on4,
        canteen_open:req.body.canteen_open,
        canteen_close:req.body.canteen_close,
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

router.post("/food_edit_search", (req, res) => {
	var item = req.body.item;
    
    console.log(item);
	// Find user by email
	food.findOne({ item }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Item is not present in the list",
			});
        }
        else{   
            res.send(user);    
        }
	});
    
});

router.post("/food_edit", (req, res) => {
    var newUserData = req.body;
    console.log(newUserData);
	// Find user by email
	food.findOneAndUpdate({ item:newUserData.item },
        newUserData, {upsert:true}, (err, user)=> {
           if (err) {console.log(err)} 
           else {
            //    console.log('func: ', user);
               res.status(200).json(newUserData);
               return newUserData;
           } 

        });
    
});
router.post("/food_place_search", (req, res) => {
    console.log(req.body);
	var item = req.body.item;
	// Find user by email
	food.findOne({ item }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Item is not present in the list",
			});
        }
        else{   
            res.send(user);
        }
	});
    
});
router.post("/food_delete_search", (req, res) => {
	var item = req.body.item;
    
    console.log(item);
	// Find user by email
	food.findOne({ item }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Item is not present in the list",
			});
        }
        else{   
             
	        var ur=user._id;
	        user.deleteOne({ _id: ur })
            .then(function () {
                console.log("Document deleted");
                res.status(200).json(user);
                
            })
            .catch(function (error) {
                console.log(error);
            });
  
        }
	});
});



module.exports = router;

