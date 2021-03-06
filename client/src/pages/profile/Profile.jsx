import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
//import {useSelector} from 'react-redux';

export default function Profile() {
  const username=useParams().username;
  //const {user} = useSelector(state=>state.UserReducer);
  const [user,setuser]=useState({});
  const PF='https://evening-scrubland-32847.herokuapp.com/images/';
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`https://evening-scrubland-32847.herokuapp.com/api/users?username=${username}`);
      //console.log(res.data);
      setuser(res.data);
    };
    fetchUser();
  }, [username]);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture?PF+user.coverPicture:PF+"person/noCover.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user?.username}</h4>
                <span className="profileInfoDesc">{user?.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            {username?<Feed username={username}/>:<></>}
            {user?<Rightbar otheruser={user}/>:<></>}
          </div>
        </div>
      </div>
    </>
  );
}