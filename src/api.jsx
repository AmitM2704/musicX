import axios from "axios";

const API = axios.create({ baseURL: "https://music-x-server.onrender.com/api/admin" });

export default API;
