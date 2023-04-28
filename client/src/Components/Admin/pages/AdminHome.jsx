import React from "react";
import AdminSidebar from "./AdminSidebar";
import Dashboard from "./Dashboard";

function AdminHome() {
  return (
    <div className="flex">
      <AdminSidebar />
      <Dashboard />
    </div>
  );
}

export default AdminHome;
