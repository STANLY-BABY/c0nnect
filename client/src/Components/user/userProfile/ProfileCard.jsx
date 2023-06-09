import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import CelebrationIcon from "@mui/icons-material/Celebration";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FemaleIcon from "@mui/icons-material/Female";
import { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../../api/UserRequest"
function ProfileCard() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    const fetchProfileUser = async () => {
      if(profileUserId===user._id){
        setProfileUser(user)
      }else{
        const profileUser=await UserApi.getUser(profileUserId)
        setProfileUser(profileUser)
        console.log(profileUser,'otherprofile');
      }
    };
    fetchProfileUser()
  },[user]);
  return (
    <div>
      <div className=" flex flex-col items-center rounded-md mt-3 xl:min-w-[18rem]  lg:min-w-[15rem] md:mx-36 lg:mx-0 mx-2 bg-white shadow-md lg:sticky md:top-0	">
        <List className="xl:w-full lg:w-48 ">
          <ListItem className="mt-5">
            <CelebrationIcon className="mr-5" />
            {user.dateOfBirth}
          </ListItem>
          <ListItem>
            <PhoneAndroidIcon className="mr-5" />
            {user.phonenumber}
          </ListItem>
          <ListItem>
            <FemaleIcon className="mr-5" />
            {user.gender}
          </ListItem>
          <ListItem>
            <FavoriteIcon className="mr-5" />
            {user.Realtionship}
          </ListItem>
          <ListItem>
            <EmailIcon className="mr-5" />
            {user.email}
          </ListItem>
          <ListItem>
            <HomeRepairServiceIcon className="mr-5" />
            {user.work}
          </ListItem>
          <ListItem>
            <LocationOnIcon className="mr-5" />
            {user.location}
          </ListItem>
          {user._id===profileUserId?( <ListItem>
            <button
              type="button"
              className="md:ml-24 ml:[5%] mt-8 w-[90%] bg-[#a974ff] text-white font-medium py-1 px-2 border  border-white rounded"
              onClick={() => setOpen(true)}
            >
              Edit Profile
            </button>
            {setOpen ? <EditProfile open={open} setOpen={setOpen} data={user} /> : null}
          </ListItem>):("")}
         
        </List>
      </div>
    </div>
  );
}

export default ProfileCard;
