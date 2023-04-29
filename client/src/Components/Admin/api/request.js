import axios from "axios";
const API = axios.create({ baseURL: "https://c0nnect.tech" });
export const getUserData = () => API.get(`/admin/getAllUsers`);
export const getAllReports = () => API.get(`/admin/getreports`);
export const getPost = (id) => API.get(`/admin/getposts/${id}`);
export const blockUser = (id) => API.put(`/admin/blockuser/${id}`);
export const fetchblockedUsers = () => API.get(`/admin/blockedusers`);
export const getPosts = (id) => API.get(`post/posts/${id}`);
