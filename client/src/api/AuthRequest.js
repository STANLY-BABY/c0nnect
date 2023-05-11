import axios from "axios";
const API = axios.create({ baseURL: "https://api.c0nnect.tech" });
// const API = axios.create({ baseURL: "http://localhost:5000" });



export const logIn = (formData) => API.post("/auth/login", formData);
export const AdminLogin = (formData) => API.post("/admin/login", formData);
export const signUp = (formData) => API.post("/auth/register", formData);
export const googleRegister = (credential) =>
  API.post("/auth//google", credential);
