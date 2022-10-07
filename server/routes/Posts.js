const express = require('express');
const router = express.Router();
const {Posts,Likes} = require('../models')
const {validateToken} = require('../middlewares/AuthMiddleware')

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

router.post('/',validateToken,async(req, res) => {

    // All the logic to insert data into the db
    
    const post = req.body;
    post.username = req.user.username;
    await Posts.create(post); //add this to db
    res.json(post);

    //make sure to wait for data to be inserted to see if any errors are there
    //in sequelize everything is async
});

router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId;
  
    await Posts.destroy({
      where: {
        id: postId,
      },
    });
    
    res.json("Post Deleted!");
  });
  

module.exports = router;