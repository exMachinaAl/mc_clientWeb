import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import Cookies from "js-cookie";
// import io from 'socket.io-client'
import { logger } from "../../utils/logger";
import api from "../../config/axiosCg";
import "./LoginForm.css";
import socket from "../../config/socketOnceR";
import { useAuth } from "../AuthContext/AuthContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [backData, setBackData] = useState("");
  // const [login, setLogin] = useState("");

  const { token, login } = useAuth();
  const navigate = useNavigate();
  // const socket = io("http://localhost:3002");

  useEffect(() => {

  }, [])

  useEffect(() => {
    const transfData = async () => {
      // do {
      let timeOfTimeOut;
      const reconnect = setInterval(async () => {
        try {
          if (socket.connected) {
            socket.emit("clientWebControl", "active");
            console.log("socket is connected");
          } else {
            console.log("socket is not connected, reconnect..");
            const timeLimit = setInterval(async () => {
              await socket.connect();
              if (socket.connected) {
                console.log("reconnected succesfully");
                logger.devMode().log("INFO", "reconnect dari socket ke login berhasil")
                clearTimeout(timeLimiter);
                clearInterval(timeLimit);
              } else console.log("failed to connected, reconnect..");
            }, 1000);
            const timeLimiter = setTimeout(() => {
              console.log("failed to connect socket, timeOut");
              clearInterval(timeLimit);
            }, 5000);
          }

          const dataExp = await api.get("/api/clientConnected");
          //setBackData(dataExp.data);

          if (typeof dataExp.data === "object") {
            setBackData(dataExp.data);
            if (dataExp.data) {
              clearInterval(reconnect);
              clearTimeout(timeOfTimeOut);
            }
          } else {
            console.warn("Data dari server bukan JSON:", dataExp.data);
          }
        } catch (err) {
          if (err.code === "ERR_NETWORK") {
            logger.devMode().log("ERROR", "server login mengalami kesalahan, palingan cuma offline")
            console.log("server login sedang offline");
          }
          // console.error("gagal mendapatkan data ", err);
        }
      }, 1000);
      // } while (!backData)
      timeOfTimeOut = setTimeout(() => {
        clearInterval(reconnect);
        console.log("server offline or death");
      }, 10000);
    };

    transfData();
  }, []);

  const loginSub = async (e) => {
    // try { // @# segera pakai ini jika terjadi error dengan pembaruan
    //   e.preventDefault();
    //   const response = await api.post("/api/login", {
    //     username,
    //     password,
    //   });
    //   setLogin(response.data);
    //   setTimeout(() => {
    //     if (response.data) {
    //       saveUserData()
    //       navigate("/dashboard");
    //     }
    //   }, 1000);
    // } catch (err) {
    //   setLogin(err.response.data);
    // }

    // if (import.meta.env.VITE_REACT_DEV_LOG === "true") {
    //   console.log("it must be true")
    // } else {
    //   console.log("it must be false")
    // }

    logger.devMode().log("error", "sorry tr=estubnf if it error it must work")
    // console.log(import.meta.env.VITE_REACT_DEV_TEST)
    
    // logger.log("INFO", "click button login and it write in log")

    try {
      e.preventDefault();
      // console.log("harusnya ini belum error");
      const res = await login(username, password);
      if (res.token) {
        // await saveUserData();
        Cookies.set("userData", JSON.stringify(res.userData), { expires: 7 });
        setTimeout(() => {
          navigate("/Dashboard");
        }, 2000);
      } else alert("gagal login check pass", res.message);
    } catch (err) {
      alert(err.response.data.message);
      console.error(err.response.data.message);
    }
  };

  // const saveUserDataAfterAuth = async () => {
  //   try {
  //     const response = await api.get('/api/v2/userAuthData', {
  //       headers: { "Authorization": `Bearer ${token}` }
  //     })
  //     const userData = response.data;

  //     if (userData) {
  //       console.log("ini adalah debug saveUserDataAfter: ", response);
  //       // Simpan data ke cookies dengan durasi 7 hari
  //       Cookies.set("userData", JSON.stringify(userData), { expires: 7 });
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch and save user data:",);
  //   }
  // };

  // const saveUserData = async () => {
  //   try {
  //     // Panggil API untuk mendapatkan data
  //     const response = await api.get("/api/userAuthData"); // Sesuaikan endpoint API Anda
  //     const userData = response.data;

  //     // Simpan data ke cookies dengan durasi 7 hari
  //     Cookies.set("userData", JSON.stringify(userData), { expires: 7 });
  //     console.log("User data saved to cookies!, the data: ", userData);
  //   } catch (error) {
  //     console.error("Failed to fetch and save user data:");
  //   }
  // };

  if (token) {
    // saveUserDataAfterAuth();
    return navigate("/dashboard");
  }

  return (
    <div className="wrapper">
      <div className="message-status">{/* <p>{login}</p> */}</div>
      <form onSubmit={loginSub}>
        <h1>Mine Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
          <label>
            {" "}
            <input type="checkbox" />
            remember me
          </label>
          <a href="#">forgot password</a>
        </div>

        <button type="submit">Login</button>

        <div className="loginter-link">
          <p>
            nggak punya akun!, <a href="/registrasi">daftar</a>
          </p>
        </div>
        <div className="backend-stat">
          {backData ? <p>{backData}</p> : <p>core: disconnect</p>}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
