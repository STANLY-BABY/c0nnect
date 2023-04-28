import express from "express";
import { getReports, reportPost } from "../Controller/PostController.js";
const router=  express.Router();

router.get('/',getReports)
router.post('/:id',reportPost)
export default router;