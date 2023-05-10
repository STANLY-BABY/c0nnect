
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../../actions/userAction";

function User({ person }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);

  const isFollowing = user.following.includes(person._id);

  const handleFollow = () => {
    dispatch(followUser(person._id, user));
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(person._id, user));
  };

  return (
    <div className="myflex ">
      <div className="myflex w-12">
        <img
          src={person.profilePicture ? person.profilePicture : "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"}
          alt="..."
          className=" shadow rounded-full border-2 border-pink-400 max-w-full h-auto mt-5 m mr-2 "
        />
        <div>
          <p className="mt-1 ml-2 float-left ">{person.username}</p>
          <p className="text-sm ml-2 w-20 text-overflow-ellipsis truncate text-slate-400">
            {person.email}
          </p>
        </div>
        {isFollowing ? (
          <button
            onClick={handleUnfollow}
            className="bg-gray-300 text-white font-medium py-1 px-2 w-20 border ml-5 border-white rounded"
          >
            Unfollow
          </button>
        ) : (
          <button
            onClick={handleFollow}
            className="bg-[#a974ff] text-white font-medium py-1 px-2 w-20 border ml-5 border-white rounded"
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
}

export default User;