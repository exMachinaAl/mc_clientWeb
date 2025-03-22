// src/config/axiosConfig.js
import axios from 'axios';
// require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env')})

const api = axios.create({
  baseURL: (`http://` + import.meta.env.VITE_MAIN_SOCKET_IP + ":" + `${import.meta.env.VITE_MAIN_APP_PORT}/login`),
});

if (!api) { // YOU NEED TO CHANGE IT FOR LOGICAL NULL
  console.log("gagal exec api");
} else {
  console.log(api.getUri);
}

export default api;
