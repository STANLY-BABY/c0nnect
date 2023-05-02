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
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
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
        if (person._id !== user._id) {
          return <User person={person} key={id} />;
        }
      })}
    </div>
  );
}

export default Suggestion;
