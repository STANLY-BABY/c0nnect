import "./App.css";
import React, { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import UserHome from "./Pages/Login/UserHome";
import Login from "./Pages/Login/Login.jsx";
import SignUp from "./Pages/Login/Signup.jsx";
import UserProfile from "./Components/user/userProfile/UserProfile";
// import EditProfile from "./Components/user/userProfile/EditProfile";
// import Followed from "./Pages/Login/Followed";
import Chat from "./Pages/Login/Chat/Chat";
import AdminHome from "./Components/Admin/pages/AdminHome";
import AdminLogin from "./Components/Admin/pages/AdminLogin";
import AdminLayout from "./Components/Admin/layout/AdminLayout";
import Dashboard from "./Components/Admin/pages/Dashboard";
import UsersList from "./Components/Admin/pages/UsersList";
import Reports from "./Components/Admin/report/Reports";
import BlockedUsers from "./Components/Admin/pages/BlockedUsers";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  const admintoken = useSelector((state) => state.AdminReducer.authData);
  return (
    <Fragment>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="login" />}
        />
        <Route
          path="/home"
          element={user ? <UserHome /> : <Navigate to="../login" />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="../home" /> : <Login />}
        />
        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="../login" />}
        />
        <Route path="/register" element={user? <Navigate to="../home"/>:<SignUp/>} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/profile/:id" element={user ? <UserProfile  />: <Navigate to="../login"/>} />
        <Route
          path="/admin/login"
          element={admintoken ? <Navigate to="../admin" /> : <AdminLogin />}
        />

        <Route path="/admin" element={<AdminLayout />}>
          {/* <Route
            index
            element={
              admintoken ? <Dashboard /> : <Navigate to="../admin/login" />
            }
          /> */}

          <Route
            path="/admin/users"
            element={
              admintoken ? <UsersList /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="/admin/allreports"
            element={
              admintoken ? <Reports /> : <Navigate to="/admin/login" />
            }
          />

          <Route
            path="/admin/blockedusers"
            element={
              admintoken ? <BlockedUsers /> : <Navigate to="/admin/login" />
            }
          />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
