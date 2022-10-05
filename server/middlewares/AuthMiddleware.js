const {verify} = require('jsonwebtoken');

// next is a function thats called when a request has to move forward
//next will run before a req to autheticate things

const validateToken = (req, res, next) => {
   
    //headers exist in the request

    const accessToken = req.header("accessToken");

    if(!accessToken){

        return res.json({error:"User not logged in!"});

    }

    else{

        try{

            const validToken = verify(accessToken,"2745e24ab694a6ae01a842aa52a2ce6dab5f3f6d80f98002c06c4310b12391fb");

            //validToken becomes the payload without a hashing
            //Thus we can retrieve required data using it

            req.user = validToken;

            if(validToken){
                return next();

                //move forward

            }

        }
        catch(err){
           
            return res.json({error:err});

        }

    }

};

module.exports = {validateToken};