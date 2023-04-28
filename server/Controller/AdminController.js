import jwt from "jsonwebtoken";
import {format} from "timeago.js"
import UserModel from "../Models/userModel.js";
import PostModel from "../Models/postModel.js";
import ReportModel from "../Models/reportModel.js";

export const getDashboard = async (req, res) => {
  try {
    const totalUsers = await UserModel.countDocuments({});
    const totalPosts = await PostModel.countDocuments({});
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);
    const userbymonth = await UserModel.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: {
            $sum: 1,
          },
        },
      },
    ]);
    const postbymonth = await PostModel.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    console.log(postbymonth);
    res.status(200).json({ totalUsers });
  } catch (error) {
    res.status(500).json(error);
  }
};



export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      const date = new Date(otherDetails.createdAt);
      const formattedDate = date.toLocaleDateString();
      return { ...otherDetails, createdAt: formattedDate };
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const adminLogin = (req, res) => {
  const credintials = {
    email: "connectadmin@gmail.com",
    password: "asdfasdf",
  };
  try {
    console.log("admin login ", req.body);
    const { email, password } = req.body;
    if (email === credintials.email && password === credintials.password) {
      const token = jwt.sign(
        {
          email: email,
        },
        process.env.JWT_SEC,
        { expiresIn: "3h" }
      );
      console.log("token", token);
      return res.status(200).json(token);
    }
    res.status(404).json("username or password is wrong");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await ReportModel.find()
      .populate("user.userId")
      .populate("user.reason")
      .exec();

    const userreports = reports.flatMap((report) => {
      return report.user.map((user) => {
        return {
          reportedBy: user.userId.username,
          reason: user.reason.reportreason,
          postId: report.postId,
          totalReports: report.user.length,
          createdAt: user?.createdAt.toLocaleString(),
        };
      });
    });
    res.status(200).json(userreports);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const blockUser = async (req, res) => {
    console.log(req.params.id)
    const id = req.params.id;
    try {
        let user = await UserModel.findOne({ _id: id })
        if (user) {
            user.isAllowed = !user.isAllowed
            user = await user.save()
            return res.status(200).json(user)
        }
        res.status(500).json("nouser")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const getAllBlockedUsers = async (req, res) => {
    try {
       let users = await UserModel.find({ isAllowed: false });
       console.log(users)
        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc;
            const formattedDate = format(otherDetails.updatedAt)
            return { ...otherDetails, updatedAt: formattedDate };
          });
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}