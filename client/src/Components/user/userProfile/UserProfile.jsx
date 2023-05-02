import Createpost from "../createPost/Createpost";
import Sidebar from "../sidebar/Sidebar";
import ProfileCard from "./ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../../api/UserRequest.js";
import React, { useEffect, useState } from "react";
import Post from "../../user/Post/Post";
import { getPosts } from "../../Admin/api/request";
import UpdateUserImages from "../userimageupdate/UpdateUserImages";
import EditIcon from "@mui/icons-material/Edit";
function UserProfile() {
  const params = useParams();
  const profileUserId = params.id;
  const [postData, setPostdata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [cover, setCover] = useState(false);
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
        const { data } = await getPosts(user._id);
        setPostdata(data);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        console.log(profileUser, "<<<pro>>>>");
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
      <div className=" ml-[18.5rem] max-w-6xl">
        <div className="h-[550px]">
          <div className="absolute rounded-md">
            <img
              src={
                user?.coverPicture
                  ? user.coverPicture
                  : "https://timelinecovers.pro/facebook-cover/download/stunning-little-flowers-facebook-cover.jpg"
              }
              className="w-[76rem] h-96 rounded-md"
              alt=""
            />
            <div  className=" absolute right-0 mt-2 bg-[#a974ff] text-white font-medium py-1 px-2  border  border-white rounded">
              Change CoverPic
              <label htmlFor="coverPic">
                <input  className="hidden" type="file" id="coverPic" onChange={handleCoverchange} />
              </label>
            </div>
          </div>
          <div className="relative top-80 left-20 flex ">
            <img
              src={
                user?.profilePicture
                  ? user.profilePicture
                  : "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
              }
              alt="..."
              className=" shadow rounded-full border-[0.2rem]  border-white  max-w-xl h-44 mt-5 m mr-2 "
            />
            <div className="bg-white w-8 border-2 h-8 rounded-full flex justify-center absolute mt-36 ml-[8.5rem]">
              <label htmlFor="profilePic">
                {<EditIcon sx={{ color: "#212121" }} />}
                {
                  <input
                    type="file"
                    id="profilePic"
                    onChange={handleProfileChange}
                    className="hidden"
                  />
                }
              </label>
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
            <div className="">
              <p className="mt-24 ml-3 text-2xl font-semibold ">
                {user.username}
              </p>
              <p className="ml-3 ">{user.email}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <ProfileCard user={profileUser} />
          <div className="">
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
  );
}

export default UserProfile;
