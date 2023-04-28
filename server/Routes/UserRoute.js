import express from "express";
import {
  DeleteUser,
  followUser,
  unfollowUser,
  UpdateUser,
  getAllUsers,
  getUserDetails,
  UpdateProfilePicture,
  UpdateCoverPicture,
} from "../Controller/UserController.js";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();
router.get("/", getAllUsers);
router.get("/:id", getUserDetails);
router.put("/:id", UpdateUser);
router.delete("/:id", DeleteUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);
router.put("/:id/updateprofile", upload.single("file"), UpdateProfilePicture);
router.put('/:id/updatecover',upload.single('file'),UpdateCoverPicture)

export default router;
