import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import Sidebar from "../../Components/user/sidebar/Sidebar";
import Suggestion from "../../Components/user/Suggestion/Suggestion";
import Home from "./Home";

function UserHome() {
  const styles = {
    display: "flex ",
    justifyContent: "center",
  };
  return (
    <div className="min-h-[100vh] bg-[#f2f7ff]">
      <div>
      <div style={styles}>
        <div>
          <Sidebar title="CONNECT" />
        </div>
        <div className="">
          <Home />
        </div>
        <div>
          {" "}
          <Suggestion />
        </div>
      </div>
      </div>
     
    </div>
  );
}

export default UserHome;
