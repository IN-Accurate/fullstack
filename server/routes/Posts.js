const express = require('express');
const router = express.Router();
const {Posts,Likes} = require('../models')

//request,response

router.get('/',async(req, res) => {

    const listOfPosts = await Posts.findAll({include:[Likes]}) 
     /*
     include likes since we cannot actually implement counting likes for the posts individually
     If if consider individual posts and likes , we need to pass requests everytime we like or unlike the post
     Instead , we Join both tables . This is much efficient
     */
    res.json(listOfPosts);                                      

    //to return as JSON, type res.json(""") , otherwise res.send();
});

router.get('/byId/:id',async (req, res) => {

    const id = req.params.id;
    
    const post = await Posts.findByPk(id); //find by primarykey

    res.json(post);

});

router.post('/',async(req, res) => {

    // All the logic to insert data into the db
    
    const post = req.body;
    await Posts.create(post); //add this to db
    res.json(post);

    //make sure to wait for data to be inserted to see if any errors are there
    //in sequelize everything is async
});

module.exports = router;