import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../../actions/userAction";
import useMediaQuery from '@mui/material/useMediaQuery';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
function User({ person }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const isFollowing = user.following.includes(person._id);

  const handleFollow = () => {
    dispatch(followUser(person._id, user));
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(person._id, user));
  };

  return (
    <div className="flex justify-center ">
      <div className="flex justify-center items-center align-middle text-center xl:w-10 lg:w-7 md:w-7 md:mb-2">
        <img
          src={
            person.profilePicture
              ? person.profilePicture
              : "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
          }
          alt="..."
          className=" shadow rounded-full border-2 border-pink-400 max-w-full h-auto xl:mt-5 mr-2 "
        />
        <div>
          <p className="mt-1 lg:ml-2 md:min-w-[4.4rem] md:max-w-[4.4rem] float-left text-left text-overflow-ellipsis truncate">{person.username}</p>
          <p className="text-sm md:w-0 xl:ml-2 lg:ml-1 xl:w-20 lg:w-16 text-overflow-ellipsis truncate text-slate-400">
            {person.email}
          </p>
        </div>
        {isFollowing ? (
          <button
            onClick={handleUnfollow}
            className="bg-gray-300 text-white font-medium xl:text-base lg:text-sm lg:py-1 xl:px-2 xl:min-w-[5rem] lg:min-w-[3.5rem] md:min-w-[2.5rem] border xl:ml-5 lg:ml-2 md:ml-3 border-white rounded"
          >
          {isLargeScreen ? (
            'Unfollow'
            ) : (
              <RemoveIcon className="inline-block text-lg mr-1" />
      )}
          </button>
        ) : (
          <button
            onClick={handleFollow}
            className="bg-[#a974ff] text-white xl:text-base md:text-sm md:font-medium lg:py-1 lg:px-2 xl:min-w-[5rem] lg:min-w-[3.5rem] md:min-w-[2.5rem] border xl:ml-5 lg:ml-3 md:ml-3 border-white rounded"
          >
           {isLargeScreen ? (
            'Follow'
            ) : (
              <AddIcon className="inline-block text-lg mr-1" />
      )}
          </button>
        )}
      </div>
    </div>
  );
}

export default User;
