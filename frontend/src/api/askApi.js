import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
//   when deploying update the base URL like this - baseURL: "https://your-backend-url.onrender.com/api"
});

export const askQuestion = async (question) => {
  const response = await API.post("/ask", { question });
  return response.data;
};