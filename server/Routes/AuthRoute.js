import express from "express";
import { googleRegister, loginUser, regUser } from "../Controller/AuthController.js";

const router = express.Router();

router.post('/register',regUser)
router.post('/login',loginUser)
router.post('/google',googleRegister)
export default router;

 