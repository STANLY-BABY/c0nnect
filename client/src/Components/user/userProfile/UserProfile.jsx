import Createpost from "../createPost/Createpost";
import Sidebar from "../sidebar/Sidebar";
import ProfileCard from "./ProfileCard";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../../api/UserRequest.js";
import React, { useEffect, useState } from "react";
import Post from "../../user/Post/Post";
import { getPosts } from "../../Admin/api/request";
import UpdateUserImages from "../userimageupdate/UpdateUserImages";
import EditIcon from "@mui/icons-material/Edit";
import useMediaQuery from "@mui/material/useMediaQuery";
function UserProfile() {
  const params = useParams();
  const profileUserId = params.id;
  const [postData, setPostdata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [cover, setCover] = useState(false);
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);
  const isLargeScreen = useMediaQuery("(min-width: 769px)");
  console.log(user,"userinprofile")
  useEffect(() => {

    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
        const { data } = await getPosts(user._id);
        setPostdata(data);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  const handleCoverchange = (e) => {
    setCover(true);
    handleChange(e);
  };
  const handleProfileChange = (e) => {
    setCover(false);
    handleChange(e);
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setShowModal(true);
    }
  };

  return (
    <div className="bg-[#f2f7ff] min-h-[100vh]">
      <Sidebar />
      <div className="md:pl-52 lg:pl-60 xl:pl-72 px-0 md:mx-2 ">
        <div className="h-auto flex-wrap">
          <div className="">
            <div className="relative">
              <img
                src={
                  user?.coverPicture
                    ? user.coverPicture
                    : "https://timelinecovers.pro/facebook-cover/download/stunning-little-flowers-facebook-cover.jpg"
                }
                className="object-cover md:object-contain h-[27rem] w-full"
                alt=""
              />
              <div>
                {isLargeScreen ? (
                  <div className="z-[100] cursor-pointer absolute flex justify-center right-0 mt-2 bg-[#a974ff] text-white font-medium py-1 px-2 border border-white rounded">
                    <label htmlFor="coverPic" className="cursor-pointer">
                      Change CoverPic
                      <input
                        className="hidden cursor-pointer"
                        type="file"
                        id="coverPic"
                        onChange={handleCoverchange}
                      />
                    </label>
                  </div>
                ) : (
                  <label htmlFor="coverPic" className="cursor-pointer">
                    <div className="absolute right-5 top-[85%] transform -translate-y-1/2 bg-white w-9 h-9 flex items-center justify-center rounded-full">
                      <EditIcon />
                      <input
                        className="hidden cursor-pointer"
                        type="file"
                        id="coverPic"
                        onChange={handleCoverchange}
                      />
                    </div>
                  </label>
                )}
              </div>
            </div>
            <div className="h-auto ">
              <div className="absolute xl:top-[21rem] lg:top-80 md:top-80 top-0 md:left-[21rem] xl:left-[26rem] flex">
                <img
                  src={
                    user?.profilePicture
                      ? user.profilePicture
                      : "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
                  }
                  alt="..."
                  className=" shadow rounded-full  border-[0.2rem]  border-white   h-44 mt-5 mr-2 "
                />
                <div className="bg-white w-8 border-2 cursor-pointer h-8 rounded-full flex justify-center absolute mt-36 ml-[8.5rem]">
                  <label htmlFor="profilePic">
                    {
                      <EditIcon
                        sx={{ color: "#212121" }}
                        className="cursor-pointer"
                      />
                    }
                    {
                      <input
                        type="file"
                        id="profilePic"
                        onChange={handleProfileChange}
                        className="hidden cursor-pointer"
                      />
                    }
                  </label>
                </div>
                <div className="">
                  <p className="mt-24 ml-3 text-2xl font-semibold ">
                    {user.username}
                  </p>
                  <p className="ml-3 ">{user.email}</p>
                </div>
              </div>
              {showModal ? (
                <UpdateUserImages
                  showModal={showModal}
                  setShowModal={setShowModal}
                  image={image}
                  cover={cover}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="lg:flex lg:justify-between mt-32">
            <div className="bg-"></div>
            <ProfileCard user={profileUser} open="false" />
            <div className="lg:ml-2">
              <Createpost />
              {postData && postData.length !== 0
                ? postData.map((post, id) => {
                    return <Post data={post} key={id} id={id} />;
                  })
                : "noo postsss"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
