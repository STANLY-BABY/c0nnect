import axios from "axios";
const API = axios.create({ baseURL: "https://api.c0nnect.tech" });
// const API = axios.create({ baseURL: "http://localhost:5000" });
export const getReports = async () => await API.get(`/report`);
export const reportPost = async (id, report) =>
  await API.post(`/report/${id}`, report);
