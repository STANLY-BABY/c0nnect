import MessageModel from "../Models/MessageModel.js";
import ChatModel from "../Models/chatModel.js";
export const addMessage = async (req, res) => {
  let { chatId, members,  senderId, text } = req.body;
  console.log('fsdfsfsfsff')
  let result
  if (members) {
    // If chatId is not present, filter ChatModel with members
    console.log(members)
    try {
      const existingChat = await ChatModel.findOne({ members: { $all: members.members } });
      if(existingChat){

        chatId = existingChat._id
      }else{

        const newChat = new ChatModel({ members:members.members });
        const savedChat = await newChat.save();
        console.log(savedChat,'savedchat')
        chatId = savedChat._id
      }
      console.log(chatId)
      const message = new MessageModel({
        chatId,
        senderId,
        text,
      });
      try {
        result = await message.save();
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json(error);
      }
      // If there is no chat with the provided members, create a new chat
    } catch (error) {
      res.status(500).json(error);
    }
  }else{
    const message = new MessageModel({
      chatId,
      senderId,
      text,
    });
    try {
      result = await message.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  
};

export const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
      const result = await MessageModel.find({ chatId });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
      
    }
  };
  