import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// import { getDashboard } from "../../../../../server/Controller/AdminController";


  const Dashboard = (data) => {
//   const { loading, data } = useSelector((state) => state.admin);

//   useEffect(() => {
//     getDashboard()
//   }, []);

  return (

    <div className="ml-80 w-[100vw] container">
      <p className="text-3xl font-[mich] mt-8">Dashboard</p>
      <hr className="w-screen  mt-5" />
      <div class="flex justify-around mt-7  w-[70%]">

        <div className="cursor-pointer border-2 flex flex-col justify-around pl-5 border-gray-200 hover:border-lime-300 w-32 rounded-3xl h-32">
          {" "}
          <p className="text-3xl">{data?.totalusers}</p>
          <p>Total Users</p>
        </div>
        <div className="cursor-pointer border-2 flex flex-col justify-around pl-5 border-gray-200 hover:border-lime-300 w-32 rounded-3xl h-32">
          {" "}
          <p className="text-3xl">{data?.totalposts}</p>
          <p>Total Posts</p>
        </div>
        <div className="cursor-pointer border-2 flex flex-col justify-around pl-5 border-gray-200 hover:border-lime-300 w-32 rounded-3xl h-32">
          {" "}
          <p className="text-3xl">100 {data?.totalreports }</p>
          <p>Total Reports</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
