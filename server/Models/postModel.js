import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    likes: [],
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        comment: {
          type: String,
        },
      },
    ],
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Post", postSchema);
export default PostModel;
