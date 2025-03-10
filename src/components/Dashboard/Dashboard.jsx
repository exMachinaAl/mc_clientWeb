import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Upload, ImagePlus } from "lucide-react";
import "./Dashboard.css";

//new code from 2025
import DashboardMenu from "./HomeMenu/DashboardMenu/DashboardMenu";
import AiMakerMenu from "./HomeMenu/AiMakerMenu/AiMakerMenu";
import socket from "../../config/socketOnceR";
import { useAuth } from "../AuthContext/AuthContext";
import AiViewerMenu from "./HomeMenu/AiViewerMenu/AiViewerMenu";

const Dashboard = () => {
  const [userAccount, setUserAccount] = useState("");
  const [UIDAccount, setUIDAccount] = useState("");
  const [imageProfileUser, setImageProfileUser] = useState(null);

  const [panelControl, setPanelControl] = useState(1);
  const [PanelComponent, setPanelComponent] = useState(<DashboardMenu />);

  const navigate = useNavigate();
  const { logout, token, sharedBotData, setSharedBotData } = useAuth();

  const panelApply1 = () => {
    setPanelControl(1);
  };
  const panelApply2 = () => {
    setPanelControl(2);
  };
  const panelApply3 = () => {
    setPanelControl(3);
  };
  const panelApply4 = () => {
    setPanelControl(4);
  };
  const panelMethode = (e) => {
    try {
      // e.preventDefault();
      switch (panelControl) {
        case 1:
          return <DashboardMenu />;
        case 2:
          return <AiMakerMenu />;
        case 3:
          return <AiViewerMenu />;
        case 4:
          break;
        default:
          return <p>choose out expected</p>;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    socket.on("stateUpdate", (ObjNData) => {
      let listUpdateBot = { ...sharedBotData };
      Object.entries(ObjNData.bots).map((botId) => {
        listUpdateBot[botId[0]] = {
          name: botId[0],
          health: botId[1].health,
          hunger: botId[1].hunger,
          customAiData: botId[1].customAiData,
        };
        setSharedBotData(listUpdateBot);
      });
    });
  }, [socket]);

  useEffect(() => {
    setPanelComponent(panelMethode());
  }, [panelControl]);

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await fetch("http://localhost:3001/api/dashboard", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        // console.log("checker is auth from dashboard: ", data.message);
      } else {
        logout();
        navigate("/login");
      }
    };

    if (token) fetchDashboard();
  }, [token, logout, navigate]);

  useEffect(() => {
    // socket.disconnect()
    // socket.connect()

    //pembatas normal

    // socket.on("userDataDetailedFrServerMn", (data) => {
    let userData = Cookies.get("userData");
    // console.log(userData);
    // do {
    //   if (userData) {
    //     const parsedData = JSON.parse(userData);
    //     setUIDAccount(parsedData.id_user_member);
    //     setUserAccount(parsedData.username);

        
    //   }
    //   userData = Cookies.get("userData");
    //   console.log("mengisi ackun data: ", userData);
    // } while (!userData);
    // });

    // const userData = Cookies.get("userData");
    // if (userData) {
    //   const parsedData = JSON.parse(userData);
    //   setUIDAccount(parsedData.id_user_member);
    //   setUserAccount(parsedData.username);
    // }

    // // Register socket event listener
    // socket.on("userDataDetailedFrServerMn", (data) => {
    //   console.log(data);
    //   const dataReDefiened = {
    //     id_user_member: data.id_user_member,
    //     username: data.username
    //   }
    //   Cookies.set("userData", JSON.stringify(dataReDefiened), { expires: 7 });
    //   setUIDAccount(data.id_user_member);
    //   setUserAccount(data.username);
    // });

    return () => {
      // socket.off("userDataDetailedFrserverMn");
    };
  }, [UIDAccount]);

  const handleLogout = () => {
    logout();
    socket.disconnect() // saya harap metode ini bekerja cukup lama
    navigate("/login");
  };

  const handleImageUploadProfile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("userID", UIDAccount); // Kirim user ID

    try {
      const response = await fetch("http://localhost:3002/upload/userProfile", {
        method: "POST",
        body: formData,
        headers: {
          "userid": UIDAccount, // Kirim userID di headers agar bisa dipakai di backend
        },
      });

      // console.log(formData);
      // console.log(response);
      const data = await response.json();
      // console.log("Uploaded Image URL:", data.imageUrl);
      // console.log("User ID:", data.userID);
      setImageProfileUser(data.imageUrl); // Simpan URL gambar dari server
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  useEffect(() => {
    // Pastikan user sudah login sebelum fetch
    if (!UIDAccount) return;

    const checkProfileImage = async () => {
      try {
        const imageUrl = `http://localhost:3002/uploads/userImage/${UIDAccount}-user-vip.png`;

        // Coba fetch gambar
        const response = await fetch(imageUrl, { method: "HEAD" });

        if (response.ok) {
          // Jika gambar ada, set sebagai profile
          setImageProfileUser(imageUrl);
        } else {
          // Jika gambar tidak ditemukan, gunakan default
          setImageProfileUser("/defaultProfile.png"); // Ubah dengan gambar default
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
        setImageProfileUser("/defaultProfile.png");
      }
    };

    checkProfileImage();
  }, [UIDAccount]); // Hanya dijalankan saat userID beruba

  // useEffect(() => {
  //   // console.log("testing use effect di dashboard main")

  // }, []);

  return (
    <div className="home-control-app">
      <div className="home-navigate-bar">
        <div className="home-user-acc">
        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md">
      {imageProfileUser ? (
        <div className="relative">
          <img
            src={imageProfileUser}
            alt="Profile"
            className="rounded-full border-2 border-gray-300"
            width={60}
            height={60}
          />
          <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-200">
            <Upload size={16} className="text-gray-600" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUploadProfile}
            />
          </label>
        </div>
      ) : (
        <label className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-300 text-gray-600 cursor-pointer hover:bg-gray-400">
          <ImagePlus size={24} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUploadProfile}
          />
        </label>
      )}

      <div>
        <p className="text-gray-700 font-semibold">User: {userAccount}</p>
        <p className="text-gray-500 text-sm">UID: {UIDAccount}</p>
      </div>
    </div>
        </div>
        <div className="title-nav">
          <h4>Menu</h4>
        </div>
        <br />
        <button onClick={panelApply1}>Dashboard</button>
        <button onClick={panelApply2}>AiDesign</button>
        <button onClick={panelApply3}>AiViewer</button>

        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="panel-sh-menu">{PanelComponent}</div>
    </div>
  );
};

export default Dashboard;
