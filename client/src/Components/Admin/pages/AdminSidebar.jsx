import "./adminSidebar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ReportIcon from '@mui/icons-material/Report';
import { Link } from "react-router-dom";
function AdminSidebar() {
  return (
    <div className="Sidebar1 shadow-lg shadow-indigo-500/40">
      <div className="container">
        <div className="menu mt-4">
          <Link to="/profile/id" style={{ textDecoration: "none" }}>
            <div className="user">
              <p className="text-2xl font-[mich]">CONNECT</p>
            </div>
          </Link>
          {/* <Link to="/adiminhome" style={{ textDecoration: "none", color: "black" }}>
            <div className="item">
              <HomeOutlinedIcon className="" />
              <span>Dashboard</span>
            </div>
          </Link> */}
          <Link
            to="/usermanagement"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="item">
              <GroupOutlinedIcon />
              <span>Users Management</span>
            </div>
          </Link>
          <Link
            to="/postmanagement"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="item">
              <DynamicFeedIcon />
              <span>Post Management</span>
            </div>
          </Link>
          <Link
            to="/reports"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="item">
              <ReportIcon />
              <span>Reports</span>
            </div>
          </Link>
          <Link
            to="/reports"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="item">
              <ReportIcon />
              <span>Reports</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
