// socket.js
import { io } from 'socket.io-client';

// Singleton untuk koneksi Socket.io
const socket = io('http://localhost:3002'); // Ganti dengan URL server Anda
// socket.emit("register", "mcCl2") // khusus digunakan react dashboard agar sekali saja render, segera ganti

// # coba buat metode socket ini non reconnect jadinya setiap event bisa lebih terstruktur
export default socket;