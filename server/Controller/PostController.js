import PostModel from "../Models/postModel.js";
import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";
import ReportModel from "../Models/reportModel.js";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import ReportReasonModel from "../Models/reportReasonModel.js";
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

export const createPost = async (req, res) => {
  let uniqueCode = uuidv4();
  req.body.image = uniqueCode;

  const uploadParams = {
    Bucket: bucketName,
    Body: req.file.buffer,
    Key: `connect/${uniqueCode}`,
    ContentType: req.file.mimetype,
  };
  s3.putObject(uploadParams, async function (err, data) {
    if (err) {
      console.log("error", err);
    } else {
      const newPost = new PostModel(req.body);
      try {
        await newPost.save();
        res.status(200).json(newPost);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  });
};

//get a post
// export const getPost = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const post = await PostModel.findById(id);
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

//update post
export const updatePost = async (req, res) => {
  console.log(req.body);
  console.log("edit");
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: { desc: req.body.desc } });
      res.status(200).json("post updated");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete post

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const userId = req.params.userid;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("post deleted successfuly");
    } else {
      res.status(403).json("Access denied!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//like a post / unlike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("unliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userPosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });
    res.status(200).json(currentUserPosts);
  } catch (error) {}
};
// Get Timeline
export const getTimelinePosts = async (req, res) => {
  console.log("....", req.params.id);
  const userId = req.params.id;

  try {
    const currentUserPosts = await PostModel.find({ userId: userId });
    let followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $unwind: "$followingPosts",
      },
      {
        $addFields: {
          "followingPosts.userId": {
            $toObjectId: "$followingPosts.userId",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followingPosts.userId",
          foreignField: "_id",
          as: "followingPosts.user",
        },
      },
      {
        $unwind: "$followingPosts.user",
      },
      {
        $unwind: "$followingPosts",
      },
      // {
      //   $match: {
      //     "followingPosts.blocked": false,
      //   },
      // },
      {
        $project: {
          _id: "$followingPosts._id",
          userId: "$followingPosts.userId",
          desc: "$followingPosts.desc",
          likes: "$followingPosts.likes",
          image: "$followingPosts.image",
          createdAt: "$followingPosts.createdAt",
          updatedAt: "$followingPosts.updatedAt",
          username: "$followingPosts.user.username",
          firstname: "$followingPosts.user.firstname",
          lastname: "$followingPosts.user.lastname",
        },
      },
    ]);
    const allPosts =currentUserPosts.concat(...followingPosts).sort((a, b) => {
      return b.createdAt - a.createdAt;
  })

    for (const post of allPosts) {
      const params = {
        Bucket: bucketName,
        Key: `connect/${post.image}`,
      };
      const command = new GetObjectCommand(params);
      const url = await getSignedUrl(s3Client, command, { expiresIn: 7200 });
      post.image = url;
    }
    res.status(200).json(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// add comment

export const addComment = async (req, res) => {
  console.log("body", req.body);
  const { userId, comment } = req.body;

  const postId = req.params.id;
  try {
    let post = await PostModel.findById({ _id: postId });
    const user = await UserModel.findById({ _id: userId });
    if (user) {
      post = await PostModel.findByIdAndUpdate(
        { _id: postId },
        {
          $push: {
            comments: {
              userId: userId,
              comment: comment,
            },
          },
        },
        { new: true }
      );
      const comm = post.comments[post.comments.length - 1];
      const { username, email } = user;
      const newComment = {
        username,
        email,
        comments: comm,
      };
      console.log("new", newComment);
      return res.status(200).json(newComment);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// getComment

export const getComment = async (req, res) => {
  const id = req.params.id;
  try {
    const comments = await PostModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $unwind: "$comments",
      },
      {
        $lookup: {
          from: "users",
          localField: "comments.userId",
          foreignField: "_id",
          as: "commentUser",
        },
      },
      {
        $unwind: "$commentUser",
      },
      {
        $project: {
          _id: 1,
          comments: 1,
          username: "$commentUser.username",
        },
      },
    ]);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
};

/// delete comment

export const deleteComment = async (req, res) => {
  console.log("commmt dlete", req.params);
  const id = req.params.id;
  const postId = req.params.postid;
  try {
    // PostModel.updateOne(
    //     { _id: postId },
    //     { $pull: { comments: { _id: id } } }
    //   )
    await PostModel.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: id } } },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// update comment

export const updateComment = async (req, res) => {
  console.log("up com", req.body, req.params.id);
  const id = new mongoose.Types.ObjectId(req.params.id);
  const postId = new mongoose.Types.ObjectId(req.params.postid);
  const { comment } = req.body;
  try {
    const post = await PostModel.findOneAndUpdate(
      { _id: postId, "comments._id": id },
      { $set: { "comments.$.comment": comment } },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//report

export const getReports = async (req, res) => {
  try {
    const reports = await ReportReasonModel.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const reportPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { userId, reason } = req.body;
    const post = await PostModel.findOne({ _id: postId });
    if (!post) return res.status(400).json({ msg: "post not avialable" });
    const user = await UserModel.findOne({ _id: userId });
    if (!user) return res.status(400).json({ msg: "something went wrong" });
    const oldreport = await ReportModel.findOne({
      postId: postId,
      user: { $elemMatch: { userId: userId } },
    });
    if (oldreport)
      return res.status(201).json({ msg: "Already you reported this post" });
    const report = new ReportModel({
      postId: postId,
      user: [{ userId: userId, reason: reason }],
      createdAt: new Date(),
    });
    await report.save();
   
    res.status(200).json({ msg: "Thanks fot letting us know" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getPost = async (req, res) => {
  console.log("post", req.params.id);
  const id = req.params.id;
  try {
    const posts = await PostModel.findOne({ _id: id });
    const params = {
      Bucket: bucketName,
      Key: `connect/${posts.image}`,
    };
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 7200 });
    posts.image = url;
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};
