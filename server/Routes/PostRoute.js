import express from "express";
import multer from "multer";
import {
  addComment,
  createPost,
  deleteComment,
  deletePost,
  getComment,
  getPost,
  getReports,
  getTimelinePosts,
  likePost,
  updateComment,
  updatePost,
  userPosts,
} from "../Controller/PostController.js";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("file"), createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id/:userid", deletePost);
router.put("/:id/like", likePost);
router.get("/:id/timeline", getTimelinePosts);
router.post('/:id/comment',addComment)
router.get('/:id/comment',getComment)
router.delete('/deletecomment/:id/:postid',deleteComment)
router.put('/updatecomment/:id/:postid',updateComment)
router.get('/posts/:id',userPosts)
export default router;
