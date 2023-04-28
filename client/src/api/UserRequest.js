import axios from "axios";
import { reject } from "promise";
const API = axios.create({ baseURL: "http://localhost:5000" });

export const getUser = (userId) => API.get(`/user/${userId}`);
export const getAllUser = () => API.get("/user");
export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);
export const unfollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);
export const updateProfilePic = (id, file) => {
    return new Promise((resolve,reject)=>{
        console.log("update pic", id, file);
        API.put(`/user/${id}/updateprofile`, file).then((respon)=>{
            resolve(respon.data)
        })
    })
  
};
export const updateCoverPic = (id, file) =>
  API.put(`/user/${id}/updatecover`, file);
