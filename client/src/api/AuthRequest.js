import API from "./ApiConfig";



export const logIn = (formData) => API.post("/auth/login", formData);
export const AdminLogin = (formData) => API.post("/admin/login", formData);
export const signUp = (formData) => API.post("/auth/register", formData);
export const googleRegister = (credential) =>
  API.post("/auth//google", credential);
