const router=require('express').Router();
const User=require('../modules/User');
const bcrypt=require('bcrypt');

router.put('/:id',async (req,res)=>{
    if(req.body.userId==req.params.id||req.body.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
              } catch (err) {
                return res.status(500).json(err);
              }
        }

        try{
            const user=User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            });
            res.status(200).json('user updated successfully');
            }catch(err){
                res.status(500).json(err);
            }

    
    }
    else{
        res.json('you can only update your account');
    }

});

router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });

router.put('/:userId/follow',async(req,res)=>{
    if (req.body.userId !== req.params.userId) {
        try {
          const user = await User.findOne({userId:req.params.userId});
          const currentUser = await User.findOne({userId:req.body.userId});
          if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({ $push: { followings: req.params.userId } });
            res.status(200).json("user has been followed");
          } else {
            res.status(403).json("you allready follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant follow yourself");
      }
});

router.put("/:userId/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.userId) {
      try {
        const user = await User.findOne({userId:req.params.userId});
        const currentUser = await User.findOne({userId:req.body.userId});
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.userId } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  });


router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findOne({userId:req.params.userId});
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findOne({userId:friendId});
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:userId",async(req,res)=>{
  try{
    const userId=req.params.userId;
    const user=await User.findOne({userId:userId});
    res.status(200).json(user);
  }catch(err){
    res.json(err);
  }
});

router.get("/:username",async(req,res)=>{
  try{
    const username=req.params.userId;
    const user=await User.findOne({username:username});
    res.status(200).json(user);
  }catch(err){
    res.json(err);
  }
});

module.exports = router;


