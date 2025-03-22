// socket.js
import { io } from 'socket.io-client';

// Singleton untuk koneksi Socket.io
// YOU NEED TO ADD CONTROL FOR NULL ENV
const apiMainServer = `http://` + import.meta.env.VITE_MAIN_SOCKET_IP + ":" + `${import.meta.env.VITE_MAIN_APP_PORT}`

const socket = io(apiMainServer); // Ganti dengan URL server Anda
// socket.emit("register", "mcCl2") // khusus digunakan react dashboard agar sekali saja render, segera ganti

// # coba buat metode socket ini non reconnect jadinya setiap event bisa lebih terstruktur
export default socket;