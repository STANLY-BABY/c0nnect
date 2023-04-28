import express from "express";
import { adminLogin, blockUser, getAllBlockedUsers, getAllUsers, getReports} from "../Controller/AdminController.js";
import ReportReasonModel from "../Models/reportReasonModel.js";
import { getPost } from "../Controller/PostController.js";



const router = express.Router();
router.post('/login',adminLogin)
// router.get('/dashboard',getDashboard)

router.post("/addreasons", async (req, res) => {
  const reason = await new ReportReasonModel({
    reportreason: req.body.reportreason,
  }).save();
});


router.get('/getAllUsers',getAllUsers)
router.get('/getReports',getReports)
router.get('/getposts/:id',getPost)
router.put('/blockuser/:id',blockUser)
router.get('/blockedusers',getAllBlockedUsers)
export default router;
