var express = require("express");
var router = express.Router();
const bcrypt = require('bcryptjs');
// Load User model
const User = require("../models/Users");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", async (req, res) => {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        contact_number: req.body.contact_number,
        type:req.body.type,
        year:req.body.year,
        age:req.body.age,
        batch_number:req.body.batch_number,
        manager_name:req.body.manager_name,
        canteen:req.body.canteen,
        canteen_open:req.body.canteen_open,
        canteen_close:req.body.canteen_close,
        password:passwordHash,
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

// Add a food item to database
// POST request 
// Login
router.post("/login", (req, res) => {
	var email = req.body.email;
    var pass = req.body.password;
    
    console.log(pass);
	// Find user by email
	User.findOne({ email }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            if(bcrypt.compare(pass, user.password)){    
                res.send(user);
            }
        }
	});
    
});

router.post("/profile", (req, res) => {
    var newUserData = req.body;
    console.log(newUserData);
	// Find user by email
	User.findOneAndUpdate({ email:newUserData.email },
        newUserData, {upsert:true}, (err, user)=> {
           if (err) {console.log(err)} 
           else {
            //    console.log('func: ', user);
            res.status(200).json(newUserData);
               return newUserData;
           } 
        });
    
});



module.exports = router;

