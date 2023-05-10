import React, { useEffect, useState } from "react";
import { getUser } from "../../api/UserRequest";

function Conversation({ data, currentUserId, online }) {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);
  return (
    <>
      <div className="">
        <div className="flex">
          <div>
            {online && <div className="online-dot"></div>}
            <img
              className="shadow rounded-full max-w-[3.5rem] h-auto border-none"
              src={
                userData?.user?.profilePicture ||
                "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
              }
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-700 text-lg ml-2 max-w-[3rem]">
              {userData?.user?.username}
            </span>
            <span className="text-slate-500 ml-2">
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default Conversation;
