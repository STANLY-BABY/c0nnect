import ChatModel from "../Models/chatModel.js";
import UserModel from "../Models/userModel.js";

export const createChat=async(req,res)=>{
const newChat = new ChatModel({
    members:[req.body.senderId,req.body.receiverId]
})
try {
    const result = await newChat.save()
    res.status(200).json(result);
} catch (error) {
    res.status(500).json(error)
}
}

export const getFollowers = async(req,res)=>{

    try {
        const {userId} = req.params
        console.log(userId,req.query.search);
        let users = await (await UserModel.find({username: { $regex: new RegExp(req.query.search), $options: 'i' }}))
        // users.map((u)=>{
        //     console.log(u.username,"name");
        // })
        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc;
            return { ...otherDetails };
          });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error)
    }
}

export const UserChats= async(req,res)=>{
    console.log('');
    try {
        const chat = await ChatModel.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(chat)
    } catch (error) {
    res.status(500).json(error)
    }
}

export const findChat = async (req,res)=>{
    console.log('adfdfdf')
    try {
        const chat = await ChatModel.findOne({
            members:{$all:[req.params.firstId,req.params.secondId]}
        })
        res.status(200).json(chat)
    } catch (error) {
    res.status(500).json(error)
    }
}