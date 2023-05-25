import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  useMantineTheme,
  Button,
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { ActionIcon } from "@mantine/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./CommentModal.module.scss";
import InputEmoji from "react-input-emoji";
import Post from "../Post/Post";
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from "../../../api/PostRequest";

const CommentModal = ({ commetModal, setCommentModal, post }) => {
  const theme = useMantineTheme();
  const inputRef = useRef(null);
  const { user } = useSelector((state) => state.authReducer.authData);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentEdit, setCommentEdit] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const lastCommentRef = useRef(null);
  const handleChange = (newMessage) => {
    setNewComment(newMessage);
  };
  const customTitle = (
    <div
      style={{
        fontSize: "24px",
        color: "#171717",
        textShadow: "1px 1px #000000",
      }}
    >
      {/* {post.username} */}
      Post
    </div>
  );

  useEffect(() => {
    const fetchComments = async () => {
        const { data } = await getComments(post._id);
        console.log(data,'comment');
        return data;
    }
    fetchComments().then((data) => {
        setComments(data)
    })
}, [])

  //   useEffect(() => {
  //     if (lastCommentRef.current) {
  //       lastCommentRef.current.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }, [comments]);

  const handleSend = (e) => {
    console.log("handel", user._id, newComment);
    let data = { userId: user._id, comment: newComment };
    addComment(post._id, data).then((res) => {
      setNewComment("");
      setComments((prevComments) => prevComments.concat(res.data));
    });
  };
  const deleteComm = (id, postId) => {
    deleteComment(id, postId).then(() => {
      setComments((prevComments) => {
        return prevComments.filter((com) => com.comments._id !== id);
      });
    });
  };
  const [editcomment, setEditcomment] = useState({});
  const editComment = (com, postId) => {
    setNewComment(com.comments.comment);
    inputRef.current?.focus();
    setCommentEdit(true);
    setTooltip(true);
    setEditcomment(com.comments._id);
  };
  const handleUpdate = () => {
    updateComment(editcomment, post._id, newComment);
  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="xl"
      opened={commetModal}
      onClose={() => setCommentModal(false)}
      title={customTitle}
      transitionProps={{ transition: "fade", duration: 200 }}
      className={styles.customModal}
    >
      <div
        style={{
          position: "relative",
          maxHeight: "400px",
          overflow: "auto",
          marginBottom: "50px",
        }}
      >
        <Post data={post} />
        {comments.length !== 0 ? (
          comments.map((comment, index) => (
            <div
              key={index}
              className={styles.commentsection}
              ref={comments.length - 1 === index ? lastCommentRef : null}
            >
              <div className={styles.comments}>
                <div>
                  <div>
                    <img
                      src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <div className={styles.username}>
                      <span>{comment.username}</span>
                    </div>
                    <p>{comment.comments.comment}</p>
                  </div>
                </div>
                {user._id === comment.comments.userId ? (
                  <div className={styles.editbutton}>
                    <Button.Group>
                      <ActionIcon variant="light">
                        <EditIcon
                          size="1rem"
                          onClick={() => editComment(comment, post._id)}
                        />
                      </ActionIcon>
                      <ActionIcon
                        variant="light"
                        onClick={() =>
                          deleteComm(comment.comments._id, post._id)
                        }
                      >
                        <DeleteIcon size="1rem" />
                      </ActionIcon>
                    </Button.Group>
                  </div>
                ) : null}
              </div>
            </div>
          ))
        ) : (
          <p>No comment, Add new</p>
        )}
      </div>
      <div
        style={{
          position: "fixed",
          //   bottom: 0,
          minWidth: "50%",
          backgroundColor: "white",
        }}
      >
        <div className={styles.commentsender}>
          <InputEmoji
            ref={inputRef}
            value={newComment}
            onClick={() => setTooltip(false)}
            onChange={handleChange}
          />

          <div
            className="button bg-[#a974ff] text-white xl:text-base md:text-sm md:font-medium lg:py-1 lg:px-2 xl:min-w-[5rem] lg:min-w-[3.5rem] md:min-w-[2.5rem] border xl:ml-5 lg:ml-3 md:ml-3 border-white rounded"
            onClick={() => (commentEdit ? handleUpdate() : handleSend())}
          >
            {commentEdit ? "update" : "Add"}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CommentModal;
