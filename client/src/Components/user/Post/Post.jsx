import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { likePost, deletePost, updatePost } from "../../../api/PostRequest";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CommentModal from "../Comment/CommentModal";
import ErrorBoundary from "../error/ErrorBoundary";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { getReports, reportPost } from "../../../api/ReportRequest";

function Post({ data }) {
  const [reportData, setReportdata] = useState([]);
  useEffect(() => {
    const fetchReports = async () => {
      const { data } = await getReports();
      setReportdata(data);
    };
    return () => fetchReports();
  }, []);

  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [opened, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const open = Boolean(anchorEl);
  const [opens, setOpens] = React.useState(false);
  const [desc, setDesc] = useState(data.desc);
  const [commetModal, setCommentModal] = useState(false);
  const [ope, setOpe] = React.useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
  const handleReportOpen = () => {
    setOpe(true);
  };
  const handleReportClose = () => {
    setOpe(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClosed = () => {
    setOpen(false);
  };
  const handleEdit = (id) => {
    updatePost(id, user._id);
  };
  const handleDelete = (id) => {
    deletePost(id, user._id);
    setOpen(false);
  };
  const handleClickOpens = () => {
    setOpens(true);
  };

  const handleCloses = () => {
    setOpens(false);
  };
  const handleChangepost = () => {
    let postData = {
      userId: user._id,
      desc: desc,
    };
    updatePost(data._id, postData);
    setOpens(false);
  };
  const handleReport = (reason) => {
    const report = { userId: user._id, reason: reason };
    console.log(report, "report", reason, "reason");
    reportPost(data._id, report);
    handleReportClose();
  };
  return (
    <>
      <div className="bg-white h-auto mb-5 mt-5 w-[51rem] myflex  ``  flex-col rounded-xl shadow-md shadow-grey-500/40">
        <div className="flex w-full px-3 justify-between mt-5">
          <div className="flex ">
            <img
              class=" w-12 mx-5 h-12 p-0.5 rounded-full ring-2 ring-pink-600 dark:ring-pink-600"
              src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
              alt="Bordered avatar"
            />
            <div>
              <p className="text-lg">{data.username || user.username}</p>
              <p className="text-slate-500 text-sm text-start">
                {format(data.createdAt)}
              </p>
            </div>
          </div>
          <div>
            <div>
              <MoreVertOutlinedIcon
                className="cursor-pointer"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              />
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={handleClickOpens}>Edit</MenuItem>
                <Dialog open={opens} onClose={handleCloses}>
                  <DialogTitle>Edit Post</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      <p className="text-red-500">
                        *Publishing this revision wil overwrite its orginal
                      </p>
                    </DialogContentText>
                    <TextField
                      autoFocus
                      defaultValue={data.desc}
                      margin="dense"
                      id="name"
                      type="text"
                      fullWidth
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleChangepost}>Confirm</Button>
                  </DialogActions>
                </Dialog>
                <MenuItem onClick={handleClickOpen}>Delete</MenuItem>
                <Dialog
                  fullScreen={fullScreen}
                  open={opened}
                  onClose={handleClosed}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                    {"Delete post?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      This post will be deleted and you won't be able to find it
                      anymore. You can also edit this post, if you want to
                      change something.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={() => handleDelete(data._id)}>
                      <p className="text-red-500">Delete POST</p>
                    </Button>
                    <Button onClick={handleClickOpens} autoFocus>
                      Edit
                    </Button>
                    <Dialog open={opens} onClose={handleCloses}>
                      <DialogTitle>Edit Post</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          <p className="text-red-500">
                            *Publishing this revision wil overwrite its orginal
                          </p>
                        </DialogContentText>
                        <TextField
                          autoFocus
                          defaultValue={data.desc}
                          margin="dense"
                          id="name"
                          type="text"
                          fullWidth
                          onChange={(e) => setDesc(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleChangepost}>Confirm</Button>
                      </DialogActions>
                    </Dialog>
                    <Button onClick={handleClosed} autoFocus>
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
                <MenuItem onClick={handleReportOpen}>Report</MenuItem>
                <Modal
                  open={ope}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Report post !
                    </Typography>
                    <div>
                      {reportData.map((data) => {
                        return (
                          <li
                            className="cursor-pointer group/item hover:bg-slate-100 mt-2"
                            onClick={() => {
                              handleReport(data._id);
                            }}
                          >
                            {data.reportreason}
                          </li>
                        );
                      })}
                    </div>
                  </Box>
                </Modal>
              </Menu>
            </div>
          </div>
        </div>

        <p className="mt-5 w-full text-left pl-10">{data.desc}</p>
        <div>
          <img
            src={data.image}
            alt=""
            className="rounded-md mt-8 mb-4 w-[49rem] h-[25rem]"
          />
        </div>
        <ErrorBoundary>
          {commetModal ? (
            <CommentModal
              commetModal={commetModal}
              setCommentModal={setCommentModal}
              post={data}
            />
          ) : null}
        </ErrorBoundary>
        <div className="w-full flex flex-col  justify-start items-start">
          <div className=" flex justify-between mb-4 w-full">
            <div className="ml-5 flex">
              <div onClick={handleLike}>
                {liked ? (
                  <FavoriteIcon
                    color="secondary"
                    className="mr-3 cursor-pointer"
                  />
                ) : (
                  <FavoriteBorderIcon className="mr-3 cursor-pointer" />
                )}
              </div>
              <div>
                <ChatBubbleOutlineIcon
                  className="mr-3 cursor-pointer"
                  onClick={() => setCommentModal(true)}
                />
              </div>
              <div>
                <ShareIcon className="mr-3 cursor-pointer" />
              </div>
            </div>
            <BookmarkBorderIcon className="mr-5 cursor-pointer" />
          </div>

          <div className=" flex  mx-5 mb-4">
            <div class="flex -space-x-4 cursor-pointer">
              <img
                class="w-7 h-7 border-2 border-white rounded-full dark:border-white-500"
                src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
                alt=""
              />
              <img
                class="w-7 h-7 border-2 border-white rounded-full dark:border-white-500"
                src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
                alt=""
              />
              <img
                class="w-7 h-7 border-2 border-white rounded-full dark:border-white-500"
                src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
                alt=""
              />
            </div>
            <div>
              {liked ? (
                <>
                  <span class="font-semibold  text-slate-900 text-md mx-1">
                    You{" "}
                  </span>
                  <span class="font-thin  text-slate-500 text-md mr-1">
                    and
                  </span>
                </>
              ) : (
                <></>
              )}

              <span class="font-semibold  text-slate-900 text-md mr-1">
                {" "}
                {liked?likes-1:likes} others
              </span>
              <span class="font-thin  text-slate-500 text-md mr-1">
                liked this.
              </span>
            </div>
          </div>
          <div className="flex mb-5">
            <span className="ml-5 font-semibold  text-slate-900 text-md mr-1">
              {/* {data.comments.comment} */}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
