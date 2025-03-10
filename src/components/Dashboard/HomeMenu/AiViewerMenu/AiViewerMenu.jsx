import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "../../../../config/axiosCg";
import socket from "../../../../config/socketOnceR";
import { useAuth } from "../../../AuthContext/AuthContext";
import "./AiViewerMenu.css";

const axiosApi = api;
const socketIp = "localhost";
const portMainServerViewer = 3004;

const AiViewerMenu = () => {
  const { sharedBotData, setSharedBotData } = useAuth();

  const [viewCookies, setViewCookies] = useState(null);

  const [botKeys, setBotKeys] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [selectedViewer, setSelectedViewer] = useState("");

  const [screenViewer, setScreenViewer] = useState("");
  const [viewerReqStatus, setViewerReqStatus] = useState(false);

  // let userData = "none";
  // try {
  //   let rawData = {};
  //   // do {
  //     rawData = Cookies.get("userData");
  //     // console.log("kesuen dancok", rawData)
  //     if (rawData) {
  //       userData = JSON.parse(rawData);
  //       // setCookiesSlow(userData)
  //     }
  //   // } while (!rawData);
  // } catch (error) {
  //   console.error("Error parsing userData from cookies:", error);
  // }

  useEffect(() => {
    if (!sharedBotData) {
      alert("bot didnt owned");
      return;
    }
    setBotKeys(Object.keys(sharedBotData));
  }, []);

  useEffect(() => {
    try {
      let rawData = {};
      // do {
      rawData = Cookies.get("userData");
      // console.log("kesuen dancok", rawData)
      if (rawData) {
        setViewCookies(JSON.parse(rawData));
        // setCookiesSlow(userData)
      }
      // } while (!rawData);
    } catch (error) {
      console.error("Error parsing userData from cookies:", error);
      return;
    }
  }, []);

  useEffect(() => {
    socket.on("spesificReceiveData", ({ status, urlViewer }) => {
      // console.log(`===(data from spesific server ss. )===`)
      // const dataKey = urlViewer.split("/")
      // console.log(`split, 3.${dataKey[3]}, 4.${dataKey[4]}`)
      // // setViewerReqStatus(status)
      // console.log(`bot structure, : `, sharedBotData)
      // let listUpdateBot = { ...sharedBotData };
      // listUpdateBot[dataKey[4]] = { // metode penyimpanan ke useMethode sangat tidak bisa dilakukan mengingat karena refresh dan dataPooling
      //   ...listUpdateBot[4],
      //   viewerUrl: {
      //     eagle: urlViewer,
      //     POV: ``
      //   }
      // };
      // setSharedBotData(listUpdateBot)
      // setScreenViewer(urlViewer)
    });

    return () => {
      socket.off("spesificReceiveData");
    };
  }, [socket]);

  const handleSelectChange = (e) => {
    setSelectedBot(e.target.value);
  };

  // const handleConfirmViewer = async () => {
  //   if (!selectedBot) {
  //     alert("choose bot first");
  //     return;
  //   }

  //   const dataPaket = {
  //     toUserId: "mcAi1",
  //     data: {
  //       event: "botOpenViewer",
  //       cmd: {
  //         clientId: viewCookies.id_user_member,
  //         botName: selectedBot,
  //       },
  //     },
  //   };

  //   // Cek apakah bot sudah memiliki viewer URL
  //   if (
  //     sharedBotData[selectedBot]?.customAiData?.eagleViewerUrlProxy &&
  //     sharedBotData[selectedBot]?.customAiData?.eagleViewerPort
  //   ) {
  //     alert("bot sudah pernah didaftarkan");
  //     setScreenViewer(
  //       sharedBotData[selectedBot].customAiData.eagleViewerUrlProxy
  //     );
  //     return;
  //   }

  //   console.log("Mengirim permintaan viewer:", dataPaket);
  //   socket.emit("dataClient2Client", dataPaket);

  //   // Memulai polling untuk menunggu data viewer tersedia
  //   let attempts = 0;
  //   const maxAttempts = 10; // Maksimal waktu tunggu 10 detik (2000ms x 10)

  //   const re_getDataViewer = setInterval(() => {
  //     const botData = sharedBotData[selectedBot]?.customAiData;

  //     if (botData?.eagleViewerUrlProxy && botData?.eagleViewerPort) {
  //       console.log("Viewer ditemukan:", botData.eagleViewerUrlProxy);
  //       setScreenViewer(botData.eagleViewerUrlProxy);
  //       clearInterval(re_getDataViewer);
  //     }

  //     attempts++;
  //     if (attempts >= maxAttempts) {
  //       alert("Bot gagal viewing");
  //       clearInterval(re_getDataViewer);
  //     }
  //   }, 2000);
  // };

  // const handleConfirmViewer = async () => {
  //   if (!selectedBot) {
  //     alert("choose bot first");
  //     return;
  //   }
  //   // axiosApi.post("")
  //   const dataPaket = {
  //     toUserId: "mcAi1",
  //     data: {
  //       event: "botOpenViewer",
  //       cmd: {
  //         clientId: viewCookies.id_user_member,
  //         botName: selectedBot,
  //       },
  //     },
  //   };

  //   // const botDataAsCheck = { ...sharedBotData }
  //   // console.log("data apakah viewer pernah di daftarkan ", botDataAsCheck)
  //   // if (botDataAsCheck[selectedBot]["viewerUrl"]?.eagle) {
  //   //   // alert("bot sudah pernah didaftarkan")
  //   //   const url = botDataAsCheck[selectedBot]["viewerUrl"]?.eagle;
  //   //   setScreenViewer(url)
  //   //   return
  //   // }

  //   let botDataAsCheck = { ...sharedBotData };
  //   if (
  //     botDataAsCheck[selectedBot]["customAiData"]?.eagleViewerUrlProxy &&
  //     botDataAsCheck[selectedBot]["customAiData"]?.eagleViewerPort
  //   ) {
  //     alert("bot sudah pernah didaftarkan");
  //     const url =
  //       botDataAsCheck[selectedBot]["customAiData"]["eagleViewerUrlProxy"];
  //     setScreenViewer(url);
  //     return;
  //   }

  //   console.log("data untuk membuka viewer: ", dataPaket);
  //   socket.emit("dataClient2Client", dataPaket);

  //   // setTimeout(() => {
  //     const re_getDataViewer = setInterval(() => {
  //       const checkIsOwned = { ...sharedBotData };
  //       const urlIsOwn = checkIsOwned[selectedBot]["customAiData"]
  //       if (urlIsOwn["eagleViewerUrlProxy"] && urlIsOwn["eagleViewerPort"]) {
  //         const url = urlIsOwn?.eagleViewerUrlProxy
  //         setScreenViewer(url)
  //       }
  //       if (screenViewer) {
  //         clearTimeout(re_getDataViewerTM)
  //         clearInterval(re_getDataViewer)
  //       }
  //     }, 2000)
  //     const re_getDataViewerTM = setTimeout(() => {
  //       alert("bot gagal viewing")
  //       clearInterval(re_getDataViewer)
  //     }, 10000)
  //     // console.log("console data", viewerReqStatus)
  //     // if (viewerReqStatus) {
  //     // fetch(`http://localhost:3004`, {
  //     //   methods: "GET",
  //     //   headers: { "Content-Type": "application/json" },
  //     // })
  //     // setScreenViewer(pathBotViewer)
  //     //   } else {
  //     //     console.log("viewer gagal dilakukan mungkin terlalu lambat")
  //     //   }
  //     // botDataAsCheck = { ...sharedBotData };
  //     // if (
  //     //   botDataAsCheck[selectedBot]["customAiData"]?.eagleViewerUrlProxy &&
  //     //   botDataAsCheck[selectedBot]["customAiData"]?.eagleViewerPort
  //     // ) {
  //     //   const url =
  //     //     botDataAsCheck[selectedBot]["customAiData"]["eagleViewerUrlProxy"];
  //     //   setScreenViewer(url);
  //     //   return;
  //     // } else alert("");
  //   // }, 10000);
  // };

  const handleConfirmViewer = async () => {
    if (!selectedBot) {
      alert("Choose bot first!");
      return;
    }

    const dataPaket = {
      toUserId: "mcAi1",
      data: {
        event: "botOpenViewer",
        cmd: {
          clientId: viewCookies.id_user_member,
          botName: selectedBot,
        },
      },
    };

    // Cek apakah bot sudah memiliki viewer yang aktif
    if (
      sharedBotData[selectedBot]?.customAiData?.eagleViewerUrlProxy &&
      sharedBotData[selectedBot]?.customAiData?.eagleViewerPort
    ) {
      console.log("Bot sudah terdaftar, gunakan viewer yang ada.");
      setScreenViewer(sharedBotData[selectedBot].customAiData.eagleViewerUrlProxy);
      return;
    }

    console.log("Mengirim request viewer:", dataPaket);
    socket.emit("dataClient2Client", dataPaket);

    // **Polling Data (Maksimal 10 detik)**
    let attempts = 0;
    const pollingInterval = setInterval(() => {
      attempts++;
      const botData = sharedBotData[selectedBot]?.customAiData;
      
      if (botData?.eagleViewerUrlProxy && botData?.eagleViewerPort) {
        setScreenViewer(botData.eagleViewerUrlProxy);
        clearInterval(pollingInterval);
      }

      if (attempts >= 5) { // Batas 10 detik
        alert("Bot gagal viewing!");
        clearInterval(pollingInterval);
      }
    }, 2000);
  };

  // **Cek perubahan pada sharedBotData**
  useEffect(() => {
    if (selectedBot && sharedBotData[selectedBot]?.customAiData?.eagleViewerUrlProxy) {
      setScreenViewer(sharedBotData[selectedBot].customAiData.eagleViewerUrlProxy);
    }
  }, [sharedBotData, selectedBot]);

  return (
    <div>
      <h1>CS T: success</h1>
      <div className="screen-bot-view">
        {screenViewer ? (
          <iframe src={screenViewer} width="90%" height="90%" />
        ) : (
          <h1>black-Screen</h1>
        )}
      </div>
      <div className="controller-s">
        <select value={selectedBot} onChange={handleSelectChange}>
          <option value="">-- Pilih Bot --</option>
          {botKeys.map((bot) => (
            <option key={bot} value={bot}>
              {bot}
            </option>
          ))}
        </select>
        <button onClick={handleConfirmViewer}>Konfirmasi</button>
      </div>
    </div>
  );
};

export default AiViewerMenu;
