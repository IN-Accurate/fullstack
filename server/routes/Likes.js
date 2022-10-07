const express = require('express');
const router = express.Router();
const {Likes} = require('../models')
const {validateToken} = require('../middlewares/AuthMiddleware')

router.post("/",validateToken,async (req, res)=>{

    const {PostId} = req.body;

    // we need't pass the user id in the request since we can get it from the localStorage through the middleware

    const UserId = req.user.id;

    const found = await Likes.findOne({where: {UserId: UserId,PostId:PostId}});

    if(!found)
    {
    
        await Likes.create({PostId: PostId,UserId: UserId});

        res.json({liked:true});
    
    }

    else
        {

            await Likes.destroy({
                where: {UserId: UserId,PostId:PostId},
            });    

            res.json({liked:false});
        }
});

module.exports = router;