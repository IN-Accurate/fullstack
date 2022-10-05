const express = require('express');
const router = express.Router();
const {Users} = require('../models')
const bcrypt = require('bcrypt');

// User registration

router.post('/',async(req, res) => {

    //destructure the password and username individually        
   
    const {username,password} = req.body;

    bcrypt.hash(password, 10).then((hash)=>
    {
        Users.create({
            username: username,
            password:hash
        });

        res.json("Registration Success!");
    }); 
    
    // 10 is saltrounds - how long it takes to hash the password
    // use bcrypt package for hashing the password

    //The password hashing is one way, i.e, we can't get the original password from a hashed data
    //Only thing we can do is whenever user enters a pw , just compare it with a hash that exits in the db

});

router.post('/login', async(req, res) => {
    
    const{username, password} = req.body;

    const user = await Users.findOne({where : {username: username }});

    if(!user)  // The user does not exist in our db
       res.json({error:"User Doesn't Exist"});
    
    bcrypt.compare(password, user.password).then((match)=>
        {

            if(!match) res.json({error:"Wrong username or password!"});

            res.json("You Logged in!");
        });


});

module.exports = router;