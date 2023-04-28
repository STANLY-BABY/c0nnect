import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);
export const likePost = (id, userId) =>
  API.put(`post/${id}/like`, { userId: userId });
export const deletePost = (id, userid) => API.delete(`post/${id}/${userid}`);
export const updatePost = (id, data) => API.put(`post/${id}`, data);
export const getComments = async (postId) =>
  await axios.get(`/post/${postId}/comment`);
export const addComment = async (postId, data) =>
  await axios.post(`/post/${postId}/comment`, data);
export const deleteComment = async (postId, commentId) =>
  await axios.delete(`/post/deletecomment/${commentId}/${postId}`);
  export const updateComment = async (postId, commentId,comment) =>
  await axios.put(`/post/updatecomment/${commentId}/${postId}`,{comment:comment});
