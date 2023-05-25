import API from "./ApiConfig";
export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);
export const likePost = (id, userId) =>
  API.put(`post/${id}/like`, { userId: userId });
export const deletePost = (id, userid) => API.delete(`post/${id}/${userid}`);
export const updatePost = (id, data) => API.put(`post/${id}`, data);
export const getComments = async (postId) =>
  await API.get(`/post/${postId}/comment`);
export const addComment = async (postId, data) =>
  await API.post(`/post/${postId}/comment`, data);
export const deleteComment = async (postId, commentId) =>
  await API.delete(`/post/deletecomment/${commentId}/${postId}`);
export const updateComment = async (postId, commentId, comment) =>
  await API.put(`/post/updatecomment/${commentId}/${postId}`, {
    comment: comment,
  });
//changed
