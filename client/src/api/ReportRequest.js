import axios from "axios";
const API = axios.create({ baseURL: "https://api.c0nnect.tech" });
export const getReports = async () => await API.get(`/report`);
export const reportPost = async (id, report) =>
  await API.post(`/report/${id}`, report);
