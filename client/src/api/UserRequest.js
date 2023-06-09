import API from "./ApiConfig";
export const getUser = async (userId) => await API.get(`/user/${userId}`);
export const getAllUser = async () => await API.get("/user");
export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);
export const unfollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);
export const updateProfilePic = (id, file) => {
  return new Promise((resolve, reject) => {
    API.put(`/user/${id}/updateprofile`, file).then((respon) => {
      resolve(respon.data);
    });
  });
};
export const updateCoverPic = (id, file) => {
  return new Promise((resolve, reject) => {
    API.put(`/user/${id}/updatecover`, file).then((response) => {
      resolve(response.data);
    });
  });
};
export const updateUser = (id, formData) =>
  API.put(`/user/${id}/update`, formData);
export const getFollowedUserSearchData = (search, id) =>
  API.get(`/chats/getFollowers/${id}?search=${search}`);
