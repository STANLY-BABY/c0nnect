import React, { useEffect, useState } from "react";
import User from "./User";
import { useSelector } from "react-redux";
import { getAllUser } from "../../../api/UserRequest";

function Suggestion() {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);
  return (
<div className="shadow-lg flex-3 fixed right-0 h-full overflow-scroll bg-white rounded-r-lg xl:w-[18rem] md:w-[12rem] lg:w-[14rem] scrollbar-hide hidden md:block ">
      <div className="search flex flex-wrap justify-center mt-10 mb-8">
        <input
          className="shadow border-blue-200 appearance-none border rounded-full xl:h-14 lg:h-12 xl:w-[15rem] lg:w-[11rem] md:w-[10rem] md:h-10 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline font-medium"
          id="search"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex justify-center items-center">
        <p className="font-medium  md:mb-4 md:text-base ">Suggestions For You </p>
      </div>
      {persons.map((person, id) => {
        if (person._id !== user._id) {
          return <User person={person} key={id} />;
        }
      })}
    </div>
  );
}

export default Suggestion;
