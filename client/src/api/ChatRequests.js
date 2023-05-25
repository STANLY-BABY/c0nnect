import API from "./ApiConfig";


export const userChats = (id) => API.get(`/chats/${id}`)