import axios from "axios";
const API = axios.create({ baseURL: "https://api.c0nnect.tech" });
export const getMessages = (id) => API.get(`/message/${id}`);
export const addMessage = (data) => API.post("/message/", data);
