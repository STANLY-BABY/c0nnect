import API from "./ApiConfig";

export const uploadPost = (data) => API.post("/post", data)