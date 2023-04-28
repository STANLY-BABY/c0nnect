import express from 'express'
import { createChat, findChat, UserChats } from '../Controller/ChatController.js'

const router = express.Router()

router.post('/',createChat)
router.get('/:userId',UserChats)
router.get('/find/:firstId/:secondId',findChat)
export default router