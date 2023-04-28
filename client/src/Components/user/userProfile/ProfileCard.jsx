import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import CelebrationIcon from "@mui/icons-material/Celebration";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FemaleIcon from "@mui/icons-material/Female";
import { useState } from "react";
import EditProfile from "./EditProfile";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useDispatch } from "react-redux";
function ProfileCard({user}) {
  const [open, setOpen] = useState(false);
const dispatch=useDispatch
  return (
    <div>
      <div className="rounded-md mt-3 min-w-[20rem]  bg-white shadow-md sticky top-0	">
        <List>
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
            Male
          </ListItem>
          <ListItem>
            <FavoriteIcon className="mr-5" />
            Relationship
          </ListItem>
          <ListItem>
            <EmailIcon className="mr-5" />
            {user.email}
          </ListItem>
          <ListItem>
            <HomeRepairServiceIcon className="mr-5" />
            Web Developer
          </ListItem>
          <ListItem>
            <LocationOnIcon className="mr-5" />
            India
          </ListItem>
          <ListItem>
            <button
              type="button"
              className="ml-24 mt-8 bg-[#a974ff] text-white font-medium py-1 px-2 border  border-white rounded"  
              onClick={()=>setOpen(true)}
            >
              Edit Profile
            </button>
            {setOpen?<EditProfile open={open} setOpen={setOpen}/>:null}
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default ProfileCard;
