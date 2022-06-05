import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import axios from 'axios';
import {useEffect,useContext,useState} from 'react';
import {useSelector} from 'react-redux';

export default function Feed({username}) {
  const [posts,setposts]=useState([]);
  const {user} = useSelector(state=>state.UserReducer);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username? await axios.get(`https://evening-scrubland-32847.herokuapp.com/api/posts/profile/${username}`):await axios.get(`https://evening-scrubland-32847.herokuapp.com/api/posts/timeline/${user?._id}`);
       //console.log('res is ',res);
      setposts(res.data);

         
    };
    fetchPosts();
  }, [username]);
  console.log('posts are ',posts);
  return (
      <div className="feed">
        <div className="feedWrapper">
          {(!username || username === user.username) && <Share />}
          {posts?.map((p) => (
            <Post key={p._id} post={p} />
          ))}
        </div>
      </div>
    );
  }