import { useState ,useEffect} from "react";
import './post.css';
import { Users } from "../../dummyData";
import { MoreVert } from "@material-ui/icons";
import axios from 'axios';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';


export default function Post({ post }) {
    const {user} = useSelector(state=>state.UserReducer);
    const [like,setLike] = useState(post.likes.length);
    const [isLiked,setIsLiked] = useState(false);
    const PF='http://localhost:8800/images/';
    useEffect(() => {
      setIsLiked(post.likes.includes(user.userId));
    }, [user.userId, post.likes]);
  
    const likeHandler =()=>{
      try {
        axios.put(`http://localhost:8800/api/posts/${post._id}/like`,  {userId:user.userId} );
      } catch (err) {}
      setLike(isLiked ? like-1 : like+1)
      setIsLiked(!isLiked)
    }
    const [pic,setpic]=useState();
    const [username,setusername]=useState();
    
    const profilephoto=axios.get(`http://localhost:8800/api/users/${post?.userId}`).then((response)=>response.data.profilePicture);
    const setprofilephoto=()=>{
      profilephoto.then((a)=>{
        
        setpic(a);
      });
    };
    setprofilephoto();  

    const userdataname=axios.get(`http://localhost:8800/api/users/${post?.userId}`).then((response)=>response.data.username);
    const setuserdataname=()=>{
      userdataname.then((a)=>{
        
        setusername(a);
      });
    };
    setuserdataname();
  
    return (
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                className="postProfileImg"
                src={PF+pic}
                alt=""
              />
              <Link to={`/profile/${username}`} style={{textDecoration:'none'}}>
                <span className="postUsername">
                  {username}
                </span>
              </Link>
            
              <span className="postDate">{post?.createdAt}</span>
            </div>
            <div className="postTopRight">
              <MoreVert />
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            <img className="postImg" src={PF+post.img} alt="" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img className="likeIcon" src={PF+"like.png"} onClick={likeHandler} alt="" />
              <img className="likeIcon" src={PF+"heart.png"} onClick={likeHandler} alt="" />
              <span className="postLikeCounter">{like} people like it</span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">{post.comment} comments</span>
            </div>
          </div>
        </div>
      </div>
    );
  }