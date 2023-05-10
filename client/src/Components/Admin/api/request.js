import axios from "axios";
const API = axios.create({ baseURL: "https://api.c0nnect.tech" });
// const API = axios.create({ baseURL: "http://localhost:5000" });

export const getUserSearchData = (search,page) => API.get(`/admin/getAllUsers?search=${search}`);
export const getUserData = () => API.get(`/admin/getAllUsers`);
export const getUserDataPage = (page) => API.get(`/admin/getAllUsers?page=${page}`)
export const getAllReports = () => API.get(`/admin/getreports`);
export const getPost = (id) => API.get(`/admin/getposts/${id}`);
export const blockUser = (id) => API.put(`/admin/blockuser/${id}`);
export const fetchblockedUsers = () => API.get(`/admin/blockedusers`);
export const getPosts = (id) => API.get(`post/posts/${id}`);
