import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import AWS from "aws-sdk";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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
export const regUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedpassword;
  const newUser = new UserModel(req.body);
  const { username } = req.body;
  try {
    const oldUser = await UserModel.findOne({ username });

    if (oldUser) {
      return res.status(400).json("Username already registered!");
    }
    const user = await newUser.save();
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_SEC,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//login user

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const verified = await bcrypt.compare(password, user.password);
      if (!verified) {
        res.status(400).json("wrong password");
      } else {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_SEC,
          { expiresIn: "1h" }
        );
        if (user.profilePicture) {
          console.log("////////");
          const params = {
            Bucket: bucketName,
            Key: `connect/profiles/${user.profilePicture}`,
          };
          const command = new GetObjectCommand(params);
          const url = await getSignedUrl(s3Client, command, {
            expiresIn: 7200,
          });
          console.log(url, "<><>>>");
          user.profilePicture = url;
        }
        if (user.coverPicture) {
          console.log("////////");
          const params = {
            Bucket: bucketName,
            Key: `connect/profiles/${user.coverPicture}`,
          };
          const command = new GetObjectCommand(params);
          const url = await getSignedUrl(s3Client, command, {
            expiresIn: 7200,
          });
          console.log(url, "<><>>>");
          user.coverPicture = url;
        }
        res.status(200).json({ user, token });
      }
    } else {
      res.status(400).json("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const googleRegister = async (req, res) => {
  console.log(req.body, "body");
  const { credential } = req.body;
  try {
    let decoded = await jwt_decode(credential);
  
    const { given_name, email, sub } = decoded;
    const user = await UserModel.findOne({ googleId: sub });
    if (user) {
      const token = jwt.sign(
        {
          username: user.username,
          id: user._id,
        },
        process.env.JWT_SEC,
        { expiresIn: "1h" }
      );
      console.log("00000000", user,token);
      res.status(200).json({ user, token });
    } else {
      const newUser = new UserModel({
        email: email,
        username: given_name,
        googleId: sub,
        expiresAt: null,
      });
      const user = await newUser.save();
      const token = jwt.sign(
        {
          username: user.username,
          id: user._id,
        },
        process.env.JWT_SEC,
        { expiresIn: "1h" }
      );
      res.status(200).json({ user, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
