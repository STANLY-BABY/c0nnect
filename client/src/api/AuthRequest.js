import axios from "axios";
const API = axios.create({ baseURL: "https://api.c0nnect.tech" });
export const logIn = (formData) => API.post("/auth/login", formData);
export const AdminLogin =(formData)=>API.post("/admin/login", formData)
export const signUp = (formData) => API.post("/auth/register", formData);
