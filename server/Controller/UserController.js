import { response } from "express";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import AWS from "aws-sdk";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import PostModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
  correctClockSkew: true,
});

const s3 = new AWS.S3();

const s3Client = new S3Client({
  correctClockSkew: true,
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

// to get user

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("user not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
// to get user

export const getUserDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      const currentUserPosts = await PostModel.find({ userId: user._id });
      const userDetails = {
        user: otherDetails,
        userPosts: currentUserPosts,
      };
      res.status(200).json(userDetails);
    } else {
      res.status(404).json("user not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update User

export const UpdateUser = async (req, res) => {

  const id = req.params.id;
  try {
    const { _id, password,} = req.body;
    const {profilePicture,coverPicture, ...rest}=req.body
    console.log("<------req.body------>",req.body);
    console.log('-----rest------',rest);
    if (id === _id) {
      try {
        if (password) {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(password, salt);
        }
        const user = await UserModel.findByIdAndUpdate(id, rest, {
          new: true,
        });
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_SEC,
          {
            expiresIn: "1hr",
          }
        );
        res.status(200).json({ user, token });
        console.log("---user---",user);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("Access denied!");
    }
  } catch (error) {}
};

//Delete user

export const DeleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;
  if (id === currentUserId || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access denied!");
  }
};

//get all users
export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    for (const user of users) {
      if (user.profilePicture) {
        const params = {
          Bucket: bucketName,
          Key: `connect/profiles/${user.profilePicture}`,
        };
        const command = new GetObjectCommand(params);
        const url = await getSignedUrl(s3Client, command, {
          expiresIn: 7200,
        });
        user.profilePicture = url;
      }
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

//follow user

export const followUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(402).json("Action forbiddden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);
      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("user followed");
      } else {
        res.status(403).json("user is already followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

//unfollow user

// export const unfollowUser = async (req, res) => {
//   const id = req.params.id;
//   const { _id } = req.body;
//   if (_id === id) {
//     res.status(403).json("Action forbidden");
//   } else {
//     try {
//       const followUser = await UserModel.findById(id);
//       const followingUser = await UserModel.findById(_id);
//       if (followUser.followers.includes(_id)) {
//         await followUser.updateOne({ $pull: { followers: _id } });
//         await followingUser.updateOne({ $pull: { following: id } });
//         res.status(200).json("user unfollowed");
//       } else {
//         res.status(403).json("user not followed");
//       }
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   }
// };
export const unfollowUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(402).json("Action forbiddden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);
      if (followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $pull: { followers: currentUserId } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("user unfollowed");
      } else {
        res.status(403).json("user is not followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
// updateProfilepicture

export const UpdateProfilePicture = (req, res) => {
  const userId = req.params.id;
  let uniqueCode = uuidv4();
  try {
    const uploadParams = {
      Bucket: bucketName,
      Body: req.file.buffer,
      Key: `connect/profiles/${uniqueCode}`,
      ContentType: req.file.mimetype,
    };
    s3.putObject(uploadParams, async function (err, data) {
      if (err) {
        console.log("error", err);
      } else {
        try {
          const user = await UserModel.findOneAndUpdate(
            { _id: userId },
            { $set: { profilePicture: uniqueCode } },
            { new: true }
          );
          if (user.profilePicture) {
            const params = {
              Bucket: bucketName,
              Key: `connect/profiles/${user.profilePicture}`,
            };
            const command = new GetObjectCommand(params);
            const url = await getSignedUrl(s3Client, command, {
              expiresIn: 7200,
            });
            user.profilePicture = url;
          }
          res.status(200).json(user);
        } catch (error) {
          res.status(500).json(error);
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// updatCoverpicture

export const UpdateCoverPicture = (req, res) => {
  const userId = req.params.id;
  let uniqueCode = uuidv4();
  try {
    const uploadParams = {
      Bucket: bucketName,
      Body: req.file.buffer,
      Key: `connect/profiles/${uniqueCode}`,
      ContentType: req.file.mimetype,
    };
    s3.putObject(uploadParams, async function (err, data) {
      if (err) {
        console.log("error", err);
      } else {
        try {
          const user = await UserModel.findOneAndUpdate(
            { _id: userId },
            { $set: { coverPicture: uniqueCode } },
            { new: true }
          );
          if (user.coverPicture) {
            const params = {
              Bucket: bucketName,
              Key: `connect/profiles/${user.coverPicture}`,
            };
            const command = new GetObjectCommand(params);
            const url = await getSignedUrl(s3Client, command, {
              expiresIn: 7200,
            });
            user.coverPicture = url;
          }
          res.status(200).json(user);
        } catch (error) {
          res.status(500).json(error);
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//search user
export const getAllFollowedUsers = async (req, res) => {
  try {
    const { search } = req.query;
    let users;
    let query = {};
    if (search) {
      query = { username: { $regex: search, $options: "i" } };
    }
    try {
      users = await UserModel.find(query).skip(skip).limit(parseInt(limit));
    } catch (error) {
      console.log(error);
    }
    try {
      const finalData = { users: users };
      console.log(finalData, "finaldata");
      res.status(200).json(finalData);
    } catch (error) {
      res.status(500).json(error);
      console.log("final error", error.message);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
