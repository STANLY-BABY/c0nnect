import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../actions/authAction";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from '@mui/icons-material/Logout';
function Sidebar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const handeleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <div className="bg-white shadow-lg shadow-indigo-500/40 fixed md:overflow-scroll md:rounded-none md:rounded-br-lg md:left-0 md:min-h-screen  md:min-w-[12rem] md:pb-16 sm:pb-2 md:flex max-h-16 min-w-full left-0 bottom-0 sm:w-[140px] md:w-[175px] lg:w-[14rem] xl:w-[18rem] px-0 sm:px-2">
      <div className="md:p-5">
        <div className=" ">
          <div className=" flex md:ml-3  md:mt-10 md:flex md:flex-col xl:gap-10 lg:gap-8  md:gap-6 flex-wrap justify-between flex-row py-1">
            <div className="hidden md:block ">
              <Link to="/home" style={{ textDecoration: "none" }}>
                <div className="md:flex md:items-center">
                  <p className=" xl:text-2xl lg:text-xl md:text-lg font-[mich]">CONNECT</p>
                </div>
              </Link>
            </div>
            <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
              <div className=" md:flex md:items-center md:ml-0 md:gap-2 mt-2 ml-2">
                <HomeOutlinedIcon className="" />
                <span className="hidden md:block lg:text-base md:text-sm">Feed</span>
              </div>
            </Link>
            <div className="md:hidden pt-2">
              <AddIcon />
            </div>
            <div className="md:hidden">
            <Link
              to={`/profile/${user._id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="" >
                <img
                  src={
                    user?.profilePicture
                      ? user?.profilePicture
                      : "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
                  }
                  alt="..."
                  className="shadow rounded-full max-w-6 max-h-6 md:min-w-[3rem] md:min-h-[3rem] border-none mt-2 mr-2"
                />
              
              </div>
            </Link>
            </div>
            <Link to="/chat" style={{ textDecoration: "none", color: "black" }}>
              <div className=" md:flex md:items-center  md:gap-2 mt-2">
                <MessageOutlinedIcon />
                <span className="hidden md:block lg:text-base md:text-sm">Messages</span>
              </div>
            </Link>
            <div className="hidden md:block ">
              <Link
                to={`/profile/${user._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className=" md:flex md:items-center md:gap-2 ">
                  <PermIdentityOutlinedIcon />
                  <span className="hidden md:block lg:text-base md:text-sm">Profile</span>
                </div>
              </Link>
            </div>
            <div className="">
              <div  onClick={handeleLogOut} className="pt-2 md:flex  md:items-center md:gap-2 cursor-pointer  text-slate-900">
                <LogoutIcon />
                <span
                  className="hidden md:block lg:text-base md:text-sm"
                >
                  LogOut
                </span>
              </div>
            </div>
            <p className="font-semibold hidden md:block">Account</p>

            <Link
              to={`/profile/${user._id}`}
              style={{ textDecoration: "none", color: "black" }}
              className="hidden md:block"
            >
              <div className="flex  items-center " >
                <img
                  src={
                    user?.profilePicture
                      ? user?.profilePicture
                      : "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
                  }
                  alt="..."
                  className="shadow rounded-full max-w-6 max-h-6 md:min-w-[3rem] md:min-h-[3rem] border-none mt-2 mr-2"
                />
                <p className="ml-2 text-lg  hidden md:block">{user.username}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
