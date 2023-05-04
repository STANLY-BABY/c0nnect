import "./sidebar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Sidebar() {
  const { user } = useSelector((state) => state.authReducer.authData);
  return (
    <div className="Sidebar shadow-lg shadow-indigo-500/40">
      <div className="container">
        <div className="menu mt-10">
          <Link to="/profile/id" style={{ textDecoration: "none" }}>
            <div className="user">
              <p className="text-2xl font-[mich]">CONNECT</p>
            </div>
          </Link>
          <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
            <div className="item">
              <HomeOutlinedIcon className="" />
              <span>Feed</span>
            </div>
          </Link>
          {/* <Link
            to="/friends"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="item">
              <GroupOutlinedIcon />
              <span>Friends</span>
            </div>
          </Link> */}
          <Link
            to="/chat"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="item">
              <MessageOutlinedIcon />
              <span>Messages</span>
            </div>
          </Link>
          {/* <Link
            to="/notifications"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="item">
              <NotificationsOutlinedIcon />
              <span>Notifiactions</span>
            </div>
          </Link> */}
          <Link
            to={`/profile/${user._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="item">
              <PermIdentityOutlinedIcon />
              <span>Profile</span>
            </div>
          </Link>

            <div className="item cursor-pointer text-slate-900">
              <SettingsOutlinedIcon />
              <span onClick={()=>{
                localStorage.clear()
              }}>LogOut</span>
            </div>

        </div>
        <div>
          <p className="my-7 font-semibold">Account</p>


          <Link
            to={`/profile/${user._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
          <div className="flex ">
            <img
              src={
                user?.profilePicture ? user?.profilePicture :"https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
              }
              alt="..."
              className="shadow rounded-full max-w-[3.5rem] h-auto border-none "
              />
            <p className="ml-2 mt-4 text-lg ">{user.username}</p>
          </div>
              </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
