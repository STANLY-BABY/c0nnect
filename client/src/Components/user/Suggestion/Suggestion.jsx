import React, { useEffect, useState } from "react";
import style from "./suggestion.module.css";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import User from "./User";
import { useSelector } from "react-redux";
import { getAllUser } from "../../../api/UserRequest";

function Suggestion() {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    console.log('data');
    const { data } = getAllUser();
    setPersons(data);
    console.log(data,"data2");
  }, []);
  return (
    <div className={style.Suggestion}>
      <div className="search flex justify-center mt-10 mb-8">
        <input
          className="shadow border-blue-200 appearance-none border rounded-full h-14 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline font-medium"
          id="search"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex justify-center">
        <p className="font-medium mr-12">Suggestions For You </p>
        <a className="text-sky-500" href="#">
          See All
        </a>
      </div>
      {persons.map((person, id) => {
        if(person._id!==user._id){
          return <User person={person} key={id} />;
        }
      })}

      <hr className="w-72 ml-12 mt-3" />
      <div className="onlineFriends">
        <div className="mt-2 flex justify-center">
          <p className="font-medium mr-36">Online</p>
          <a className="text-sky-500" href="#">
            See All
          </a>
        </div>
        {persons.map((data) => {
          return (
            <div className="myflex ">
              <div className="myflex w-12 ">
                <div class="relative">
                  <img
                    src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
                    alt="..."
                    className=" shadow rounded-full  max-w-xl h-11 mt-5 m mr-2 "
                  />
                  <span class="top-4 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-white-800 rounded-full"></span>
                </div>
                {/* 
            <div className="online w-3 h-3 bg-lime-500 rounded-full absolute top-4 right-24"></div> */}
                <div>
                <p className="mt-1 ml-2 float-left ">{data.username}</p>
          <p className="text-sm ml-2 w-20 text-overflow-ellipsis truncate text-slate-400">
            {data.email}
          </p>
                </div>
                <SendOutlinedIcon className="ml-14" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Suggestion;
