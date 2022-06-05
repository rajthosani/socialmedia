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

//const mongo_url='mongodb+srv://raj:98339930@cluster0.rtf3s.mongodb.net/socialmedia?retryWrites=true&w=majority';
const app= express();
app.use("/images", express.static(path.join(__dirname, "/public/images")));
//app.use("/images", express.static("https://evening-scrubland-32847.herokuapp.compublic/images"));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
if (process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"/client/build")));

  app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"client","build","index.html"));});
  
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
//const PORT= process.env.PORT || 8800;
//const PORT=8800;
app.listen(PORT,()=>{
  console.log('backend is running');
})

app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/posts',postRoute);

