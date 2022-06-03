import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function Topbar() {
  const {user} = useSelector(state=>state.UserReducer);
  const PF='http://localhost:8800/images/';
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to='/' style={{textDecoration:'none'}}><span className="logo">Lamasocial</span></Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
                }
              alt=""
              className="topbarImg"
            />
          </Link>
      </div>
    </div>
  );
}