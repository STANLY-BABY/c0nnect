import express from "express";
import { loginUser, regUser } from "../Controller/AuthController.js";

const router = express.Router();

router.post('/register',regUser)
router.post('/login',loginUser)

export default router;

 