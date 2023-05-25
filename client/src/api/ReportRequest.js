import API from "./ApiConfig";

export const getReports = async () => await API.get(`/report`);
export const reportPost = async (id, report) =>
  await API.post(`/report/${id}`, report);
