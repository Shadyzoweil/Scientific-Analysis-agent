import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

export const analyzePaper = async (query: string) => {
  const response = await axios.post(`${API_URL}research-paper-agent/`, {
    query, // Correct key name
  });
  console.log(response);
  return response.data;
};
