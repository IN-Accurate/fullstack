const express = require('express');
const router = express.Router();
const {Posts} = require('../models')

//request,response

router.get('/',async(req, res) => {

    const listOfPosts = await Posts.findAll()
    res.json(listOfPosts);

    //to return as JSON, type res.json(""") , otherwise res.send();
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