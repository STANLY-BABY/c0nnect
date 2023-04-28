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

function UserProfile() {
  const params = useParams();
  const profileUserId = params.id;
  const [postData, setPostdata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [cover, setCover] = useState(false);

  // useEffect(()=>{
  //   const fetchUserPost = async()=>{
  //     if(profileUserId===user._id){
  //       setProfileUser(user)
  //     }
  //   }
  // })
  // const dispatch = useDispatch();
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
              src="https://timelinecovers.pro/facebook-cover/download/stunning-little-flowers-facebook-cover.jpg"
              className="w-[76rem] h-96 rounded-md"
              alt=""
            />
            <button>Cover</button>
            <input type="file" id="coverPic" onChange={handleCoverchange} />
          </div>
          <div class="relative top-80 left-20 flex ">
            <img
              src={
                user?.profilePicture
                  ? user.profilePicture
                  : "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
              }
              alt="..."
              className=" shadow rounded-full border-[0.2rem]  border-white  max-w-xl h-44 mt-5 m mr-2 "
            />
            <button><input type="file" id="profilePic" onChange={handleProfileChange} /></button>
            
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
                  return <Post data={post} id={id} />;
                })
              : "noo postsss"}
            {/* <div className=""><Post/></div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
