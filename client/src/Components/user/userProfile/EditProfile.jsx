import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../../actions/userAction";

function EditProfile({ open, setOpen, data }) {
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const dispatch = useDispatch();
  const param = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    let UserData=formData;
    dispatch(updateUser(param.id,UserData))
    setOpen(false)
  }
  return (
    <div className="">
      <Dialog
        className="max-w-full"
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Edit profile</DialogTitle>
        <DialogContent>
          <DialogContentText>Work</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="work"
            id="work"
            type="text"
            onChange={handleChange}
            value={formData.work}
            fullWidth
          />
          <DialogContentText>Education</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="education"
            name="education"
            type="text"
            onChange={handleChange}
            value={formData.education}
            fullWidth
          />
          <DialogContentText>Location</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="location"
            name="location"
            type="text"
            onChange={handleChange}
            value={formData.location}
            fullWidth
          />
           <DialogContentText>Gender</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="gender"
            name="gender"
            type="text"
            onChange={handleChange}
            value={formData.gender}
            fullWidth
          />
          <DialogContentText>Relationship</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Realtionship"
            name="Realtionship"
            type="text"
            onChange={handleChange}
            value={formData.Realtionship}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <button
            type="button"
            className="bg-[#a974ff] text-white font-medium py-1 px-2 border  border-white rounded"
            onClick={handleSubmit}
          >
            Edit Profile
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditProfile;
