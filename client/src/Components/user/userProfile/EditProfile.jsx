import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function EditProfile({ open, setOpen }) {
  return (
    <div className="">
      <Dialog className="max-w-full" fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogContent>
          <DialogContentText>Work</DialogContentText>
          <TextField autoFocus margin="dense" id="work" type="text" fullWidth />
          <DialogContentText>Education</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="education"
            type="text"
            fullWidth
          />
          <DialogContentText>Current town</DialogContentText>
          <TextField autoFocus margin="dense" id="town" type="text" fullWidth />
          <DialogContentText>Relationship</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Relationship"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <button
              type="button"
              className="bg-[#a974ff] text-white font-medium py-1 px-2 border  border-white rounded"  
              onClick={()=>setOpen(false)}
            >
              Edit Profile
            </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditProfile;
