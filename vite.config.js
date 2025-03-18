import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path from "path";
// import dotenv from 'dotenv';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const env = loadEnv(mode, __dirname,);
  // dotenv.config({ path: path.resolve(__dirname, `.env.react`)})

  return {
    plugins: [react({
      fastRefresh: false
    })],
    server: {
      // port: Number(env.VITE_REACT_PORT) || 5173,
      port: Number(env.VITE_REACT_PORT) || 5173,
    },
    define: {
      'process.env': env, // Memasukkan variabel dotenv ke dalam konfigurasi Vite
      // 'process.env': process.env, // Memasukkan variabel dotenv ke dalam konfigurasi Vite
    },
    css: {
      modules: {
        scopeBehaviour: "local",
      },
    },
  };
});
