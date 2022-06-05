import Online from "../online/Online";
import './rightbar.css';
import { Users } from "../../dummyData";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import {useSelector} from 'react-redux';

export default function Rightbar({otheruser}) {
    const {user} = useSelector(state=>state.UserReducer);
    console.log('user from rightbar is',user);
    console.log('otheruser is',otheruser);


    const [friends, setfriends] = useState([]);
    const [followed, setfollowed] = useState(
      otheruser&&user?.followings.includes(otheruser?.id)
    );
    const PF='https://evening-scrubland-32847.herokuapp.com/images/';


    const handleClick = async () => {
      try {
        if (followed) {
          await axios.put(`https://evening-scrubland-32847.herokuapp.com/api/users/${otheruser?.userId}/unfollow`, {
            userId: user?.userId,
          });
          
        } else {
          await axios.put(`https://evening-scrubland-32847.herokuapp.com/api/users/${otheruser?.userId}/follow`, {
            userId: user?.userId,
          });
         
        }
        setfollowed(!followed);
      } catch (err) {
      }
    };

    useEffect(() => {
      const getFriends = async () => {
        try {
          const friendList = await axios.get(`https://evening-scrubland-32847.herokuapp.com/api/users/friends/${otheruser?.userId}`);
          setfriends(friendList.data);
        } catch (err) {
          console.log(err);
        }
      };
      getFriends();
    }, [otheruser]);

    const HomeRightbar = () => {
      const PF='https://evening-scrubland-32847.herokuapp.com/images/';
      return (
        <>
          <div className="birthdayContainer">
            <img className="birthdayImg" src={PF+"gift.png"} alt="" />
            <span className="birthdayText">
              <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
            </span>
          </div>
          <img className="rightbarAd" src={PF+"ad.png"} alt="" />
          <h4 className="rightbarTitle">Online Friends</h4>
          <ul className="rightbarFriendList">
            {Users?.map((u) => (
              <Online key={u._id} user={u} />
            ))}
          </ul>
        </>
      );
    };
  
    const ProfileRightbar = () => {
      return (
        <>
        {otheruser?.username !== user?.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends?.map((friend) => (
            <Link key={friend._id}
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
      );
    };
    return (
      <div className="rightbar">
        <div className="rightbarWrapper">
          {otheruser ? <ProfileRightbar /> : <HomeRightbar />}
        </div>
      </div>
    );
  }