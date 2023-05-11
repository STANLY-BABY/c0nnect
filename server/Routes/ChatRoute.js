import express from 'express'
import { createChat, findChat, UserChats, getFollowers } from '../Controller/ChatController.js'

const router = express.Router()
router.get('/getFollowers/:userId',getFollowers)
router.post('/',createChat)
router.get('/:userId',UserChats)
router.get('/find/:firstId/:secondId',findChat)
// router.get('/getFollowers/:Id',(req,res)=>{console.log('hellooooo')})
export default router