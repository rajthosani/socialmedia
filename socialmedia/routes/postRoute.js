const router=require('express').Router();
const Post =require('../modules/Post');
const { findById } = require('../modules/User');
const User=require('../modules/User');

router.post('/', async (req,res)=>{
    const newpost=new Post(req.body);
    try{
        const savedpost= await newpost.save();
        res.status(200).json(savedpost);
    }catch(err){
        res.status(500).json(err);
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const Post= await Post.findById(req.params.id);
        if (Post.userId==req.body.userId){
            await Post.updateOne({$set:req.body});
            res.status(200).json('post has been updated');
        }
        else{
            res.status(500).json('user id doesnt match');
    }}catch(err){
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("the post has been deleted");
      } else {
        res.status(403).json("you can delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });  

router.put('/:id/like',async (req,res)=>{
    const post=await Post.findById(req.params.id);
    
    try{

        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}})
            res.status(200).json('liked');
        }
        else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json('disliked');
        }}catch(err){
            res.status(500).json(err);
        }

    
});

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    //console.log(currentUser);
    const userPosts = await Post.find({ userId: currentUser.userId });
    
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user.userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports=router;