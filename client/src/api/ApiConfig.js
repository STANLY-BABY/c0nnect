import axios from "axios";
const API = axios.create({ baseURL: "https://api.c0nnect.tech" });
export default API;
export const S3URL="https://learnreactbrocamp.s3.ap-northeast-1.amazonaws.com/connect/profiles/"