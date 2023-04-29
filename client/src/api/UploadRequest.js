import axios from "axios";

const API = axios.create({ baseURL: "https://c0nnect.tech" });

export const uploadPost = (data) => API.post("/post", data)