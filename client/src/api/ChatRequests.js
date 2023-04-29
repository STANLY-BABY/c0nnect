import axios from 'axios'
const API = axios.create({ baseURL: "https://c0nnect.tech" });
export const userChats = (id) => API.get(`/chats/${id}`)