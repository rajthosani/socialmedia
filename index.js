const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoute=require('./routes/authRoute');
const postRoute=require('./routes/postRoute');
const userRoute=require('./routes/userRoute');
const path=require("path");
const multer=require("multer");
const router=express.Router();
const User=require('./modules/User');
const Post=require('./modules/Post');
const cors=require('cors');
require("dotenv").config({path: "./config.env"});
//const path=require("path");

const currpath=path.resolve();
console.log('currpath is',currpath);

const Posts = [
  {
    userId: 1,
    desc: "Love For All, Hatred For None.",
    img: "post/1.jpeg",
   
    likes: [],
  
  },
  {
    userId: 2,
    desc: "Love For All, Hatred For None.",
    img: "post/2.jpeg",
    
    likes: [],
    
  },
  {
    userId: 3,
    desc: "Every moment is a fresh beginning.",
    img: "post/3.jpeg",
  
    
    likes: [],
 
  },
  {
    userId: 4,
    desc: "Love For All, Hatred For None.",
    img: "post/4.jpeg",
    
  
    
    likes: [],
  
  },
  {
    userId: 5,
    
    desc: "Love For All, Hatred For None.",
    img: "post/5.jpeg",
    
    
    likes: [],
   
  },
  {
    userId: 6,
    
    desc: "Love For All, Hatred For None.",
    img: "post/6.jpeg",
    
    
    likes: [],
    
  },
  {
    userId: 7,
    desc: "Never regret anything that made you smile.",
    img: "post/7.jpeg",
   
    
    likes: [],
   
  },
  {
    userId: 8,
    
    desc: "Love For All, Hatred For None.",
    img: "post/8.jpeg",
    
    
    likes:[],
   
  },
  {
    userId: 9,
    desc: "Change the world by being yourself.",
    img: "post/9.jpeg",
  
    
    likes:[],

  },
  {
    userId: 10,
    desc: "Love For All, Hatred For None.",
    img: "post/10.jpeg",
    
    likes: [],
    
    
  },
];

const Users = [
  { 
    userId:1,
    profilePicture: "person/1.jpeg",
    username: "Safak Kocaoglu",
    coverPicture:"16174607888833.jpeg",
    email:"safak@gmail.com",
    password:"abcdwewej"
  },
  {
    userId:2,
    profilePicture: "person/2.jpeg",
    coverPicture:"16174609091745.jpeg",
    username: "Janell Shrum",
    email:"janell@gmail.com",
    password:"abcdwewj"
  },
  {
    userId:3,
    profilePicture: "person/3.jpeg",
    coverPicture:"16174612295744.jpeg",
    username: "Alex Durden",
    email:"alex@gmail.com",
    password:"abcdwsaadf"
  },
  {
    userId:4,
    profilePicture: "person/4.jpeg",
    username: "Dora Hawks",
    coverPicture:"16174665087431.jpeg",
    email:"dora@gmail.com",
    password:"abcdwefefs"
  },
  {
    userId:5,
    profilePicture: "person/5.jpeg",
    coverPicture:"16174672861673.jpeg",
    username: "Thomas Holden",
    email:"thomas@gmail.com",
    password:"abcdwegrdgj"
  },
  {
    userId:6,
    profilePicture: "person/6.jpeg",
    username: "Shirley Beauchamp",
    email:"shirley@gmail.com",
    password:"abcdwrgrg"
  },
  {
    userId:7,
    profilePicture: "person/7.jpeg",
    username: "Travis Bennett",
    email:"travis@gmail.com",
    password:"abcggrwej"
  },
  {
    userId:8,
    profilePicture: "person/8.jpeg",
    username: "Kristen Thomas",
    email:"kristen@gmail.com",
    password:"abcdwgdxewej"
  },
  {
    userId:9,
    profilePicture: "person/9.jpeg",
    username: "Gary Duty",
    email:"gary@gmail.com",
    password:"abcdwewegdgj"
  },
  {
    userId:10,
    profilePicture: "person/10.jpeg",
    username: "Maya Kocaoglu",
    email:"maya@gmail.com",
    password:"abcdwewtftej"
  },
];

//const mongo_url='mongodb+srv://raj:98339930@cluster0.rtf3s.mongodb.net/socialmedia?retryWrites=true&w=majority';
const app= express();
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
if (process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"/client/build")));

  app.get("/home",(req,res)=>{
    res.sendFile(path.join(__dirname,"client","build","index.html"));});
  
}else {
  app.get("/",(req,res)=>{
    res.send("Api running");
  })
}

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );
const insertdummydata=async()=>{
  try{
    await User.deleteMany({});
   // await Post.deleteMany({});
    await User.insertMany(Users);
   // await Post.insertMany(Posts);
  
  }catch(err){
    console.log(err);
  }

}
//insertdummydata();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });  

app.listen(process.env.PORT,()=>{
  console.log('backend is running');
})

app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/posts',postRoute);

