// src/config/axiosConfig.js
import axios from 'axios';
// require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env')})

const api = axios.create({
  baseURL: process.env.REACT_APP_API_AXIOS_URL,
});

if (!api) {
  console.log("gagal exec api");
} else {
  console.log(api.getUri);
}

export default api;
