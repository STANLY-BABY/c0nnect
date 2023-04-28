import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
export const regUser = async (req, res) => {

  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);
  req.body.password=hashedpassword
  const newUser = new UserModel(req.body);
  const {username}=req.body
  try {
    const oldUser= await UserModel.findOne({username})
    
    if(oldUser){
      return res.status(400).json("Username already registered!")
    }
    const user= await newUser.save();
    const token= jwt.sign({
      username:user.username,id:user._id
    },process.env.JWT_SEC,{expiresIn:'1h'}
    )
    res.status(200).json({user,token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//login user

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email});
    if(user){
       const verified = await bcrypt.compare(password,user.password) 
     if(!verified){
      res.status(400).json('wrong password')
     }else{
      const token= jwt.sign({
        username:user.username,id:user._id
      },process.env.JWT_SEC,{expiresIn:'1h'}
      )
      res.status(200).json({user,token})
     }
    }
    else{
        res.status(400).json('User not found')
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
