const express = require('express');
const router = express.Router();
const {Users} = require('../models')
const bcrypt = require('bcrypt');

const {sign} = require('jsonwebtoken');

const {validateToken} = require('../middlewares/AuthMiddleware')

//https://stackoverflow.com/questions/31309759/what-is-secret-key-for-jwt-based-authentication-and-how-to-generate-it

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

            if(!match) 
              res.json({error:"Wrong username or password!"});

            else{

                 const accessToken = sign({username:user.username,id:user.id},
                     "2745e24ab694a6ae01a842aa52a2ce6dab5f3f6d80f98002c06c4310b12391fb"
                     );
                     // node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
                    
                 res.json(accessToken);
            
            }

            // In Google Chrome , Network tab gives all requests present currently. In the respone tab , there will be this token
            // In application tab , we can get sessionstorage and cookie items
            //JWT isn't 100% secure and is vulnerable to XSS attacks

        });

});

router.get('/auth',validateToken,(req, res) => {
    res.json(req.user)
})

module.exports = router;