import axios from "axios";

export const config = axios.create({
  baseURL: "http://localhost:10000",
});
