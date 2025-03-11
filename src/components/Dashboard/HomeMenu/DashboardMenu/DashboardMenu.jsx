import React, { useState, useEffect } from "react";
import ScroolToBottom from "react-scroll-to-bottom";
import Cookies from "js-cookie";
// import io from "socket.io-client";
import { useAuth } from "../../../AuthContext/AuthContext";
import BotAvailable from "../../BotAvailable/BotAvailable";
import PopupTools from "./PopupTools/PopupTools";
import socket from "../../../../config/socketOnceR";
import "./DashboardMenu.css";
// import { Await } from "react-router-dom";
// import api from "../../../../config/axiosCg";
// import BotsList from "../../BotsList/BotsList";
// import BotConfiguration from "../../BotConfiguration/BotConfiguration";

const Dashboard_menu = () => {
  const [pingInStatus, setPingInStatus] = useState([]);
  const [botId, setBotId] = useState({});
  const [humanError, setHumanError] = useState();
  const [botViewer, setBotViewer] = useState("");
  const [botNames, setBotNames] = useState([]);
  const [showedBotMenu, setShowedBotMenu] = useState("");

  const [socketId, setSocketId] = useState(null);
  const [cookiesNow, setCookiesNow] = useState("");
  const [CookiesSlow, setCookiesSlow] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalResult, setModalResult] = useState({});

  const { sharedBotData, setSharedBotData } = useAuth()

  //const socket = io("http://localhost:3002"); //cacat, tolong jadikan metode multi client bukan hanya local single client

  // useEffect(() => {
    // const updaterBotStats = () => { //@ metode paling berhasil saat ini tapi kuno
    //   socket.on("botStatsSUID", (botStats) => {
    //     let listUpdateBot = { ...botId };
    //     listUpdateBot[botStats.id] = {
    //       name: botStats.name,
    //       health: botStats.health,
    //       hunger: botStats.hunger,
    //     };
    //     setBotId(listUpdateBot);
    //   });
    // };
    // updaterBotStats();

    // return () => {
    //   socket.off("botStatsSUID");
    // };

    // socket.on("stateUpdate", (ObjNData) => { // metode yang hampir dikatakan sempurna, kembalikan jika error
    //   let listUpdateBot = { ...botId };
    //   Object.entries(ObjNData.bots).map((botId) => {
    //     listUpdateBot[botId[0]] = {
    //       name: botId[0],
    //       health: botId[1].health,
    //       hunger: botId[1].hunger,
    //     };
    //     setBotId(listUpdateBot);
    //     console.log(botId);
    //   });
    //   console.log("pembatas data");
    // });
  //   socket.on("stateUpdate", (ObjNData) => {
  //     let listUpdateBot = { ...sharedBotData };
  //     Object.entries(ObjNData.bots).map((botId) => {
  //       listUpdateBot[botId[0]] = {
  //         name: botId[0],
  //         health: botId[1].health,
  //         hunger: botId[1].hunger,
  //         customAiData: botId[1].customAiData,
  //       };
  //       setSharedBotData(listUpdateBot);
  //       // console.log(botId);
  //     });
  //     // console.log("pembatas data");
  //   });
  // }, [socket]);

  // useEffect(() => {
  //   socket.on("userDataDetailedFrserverMnSc", (dataUserDt) => { // tolong dihapus dan diganti dengan isi cookie
  //     if (dataUserDt) {
  //       const tempDataFrUserDT = dataUserDt
  //       // socket.disconnect()
  //       // socket.connect()
  //       socket.emit("register", ("mcCl2", "?", tempDataFrUserDT.id_user_member))
  //     }
  //   })

  //   return () => {
  //     socket.off("userDataDetailedFrserverMn");
  //   };
  //   }, [socket]);

  let userData = "none";
  try {
    let rawData = {};
    // do {
      rawData = Cookies.get("userData");
      console.log("kesuen dancok", rawData)
      if (rawData) {
        userData = JSON.parse(rawData);
        // setCookiesSlow(userData)
      }
    // } while (!rawData);
  } catch (error) {
    console.error("Error parsing userData from cookies:", error);
  }

  // useEffect untuk menangani koneksi socket dan menyimpan ID
  useEffect(() => {
    const handleConnect = () => {
      if (socketId !== socket.id) {
        setSocketId(socket.id);
      }

      const clientArcId = `mcCl2?${userData.id_user_member}?${socket.id}`;
      console.log("Client not merch: ", clientArcId);

      if (cookiesNow !== clientArcId) {
        setCookiesNow(clientArcId);
      }
    };

    if (socket.connected) {
      handleConnect();
    } else {
      socket.on("connect", handleConnect);
    }

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [socketId, cookiesNow]); // Hanya bergantung pada socketId dan cookiesNow

  // useEffect untuk mengirim data registrasi ke server setelah cookiesNow diperbarui
  useEffect(() => {
    if (cookiesNow) {
      const userAccount = cookiesNow.split("?");
      socket.emit("register", userAccount[1]);
      console.log("Registering with:", userAccount[1]);
    }
  }, [cookiesNow]); // Hanya dipanggil jika cookiesNow beruba

  // useEffect(() => { // %% thius is the new one and work
  //   // const anonymousClient = "anonymCl2";
  //   // socket.emit("register", anonymousClient);

  //   // socket.on("userDataDetailedFrServerMn", (data) => {
  //   //   console.log(data);
  //   //   const dataReDefiened = {
  //   //     id_user_member: data.id_user_member,
  //   //     username: data.username,
  //   //   };
  //   //   Cookies.set("userData", JSON.stringify(dataReDefiened), { expires: 7 });
  //   // });

  //   const rawData = Cookies.get("userData");
  //   let userData = "none";
  //   if (rawData) {
  //     userData = JSON.parse(rawData);
  //   }

  //   if (socket.connected) {
  //     // console.log("Socket ID (direct):", socket.id);
  //     setSocketId(socket.id);
  //     const clientArcId = "mcCl2" + "?" + userData.id_user_member + "?" + socket.id;
  //     console.log("client not merch: ", clientArcId)
  //     setCookiesNow(clientArcId)
  //   } else {
  //     socket.on("connect", () => {
  //       //console.log("Socket connected with ID:", socket.id);
  //       setSocketId(socket.id);

  //       const clientArcId = "mcCl2" + "?" + userData.id_user_member + "?" + socket.id;
  //       console.log("client not merch: ", clientArcId)
  //       setCookiesNow(clientArcId)

  //       // Object.keys()
  //       // const StringFunction = clientArcId.split("?")
  //       // console.log("StringFunctionSplit: ", StringFunction)
  //       // console.log("client merch as socketId: ", "none")
  //     });
  //   }

  //   const userAccount = cookiesNow.split("?");
  //   socket.emit("register", userAccount[1])

  //   // const clientArcId = ( "mcCl2" + "?" + userData.id_user_member + "?" + socketId )
  //   // const idSocket = socket.id

  //   // console.log("cookies: ", userData)
  //   // console.log("idSocket: ", idSocket)
  //   // console.log("Socketid: ", socketId)
  //   // console.log("client not merch: ", clientArcId)

  //   return () => {
  //     // socket.off("userDataDetailedFrserverMn");
  //     socket.off("connect");
  //   };
  // }, [socket, socketId, cookiesNow]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleModalSubmit = async (botDataReg) => {
    // console.log(cookiesNow) 
    const userAccount = cookiesNow.split("?");
    // socket.emit("register", userAccount[1])

    setModalResult(botDataReg); // Simpan hasil input ke state
    setIsModalOpen(false); // Tutup modal

    const servTId = "mcAi1";
    const dataJs = {
      // from: "",
      event: "createBot",
      cmd: {
        userAcc: userAccount[1],
        ...botDataReg,
      },
    };
    // console.log("mengirim data objek ke main server")
    // console.log("data objek dataJS: ", dataJs)
    socket.emit("dataClient2Client", { toUserId: servTId, data: dataJs }); // ngotak dong diterusin abis benerin sisi botLogic
  };

  // useEffect(() => {
  //   /*const getStatusBot = async () => {
  //       const response = await axios.get("http://localhost:3002/botapi/statuschat");
  //       const resStr = response.data
  //       setPingInStatus([...pingInStatus, resStr])

  //     };*/
  //   //let botStats
  //   // socket.on("dataPlayer", (dataP) => {
  //   //   if (!dataP) setHumanError("lol socket gagal");
  //   //   const [name = "None", health = "0", hunger = "0"] = dataP || [];
  //   //   const botStats = {
  //   //     name,
  //   //     health,
  //   //     hunger,
  //   //   };
  //   //   setBotNames([...botNames, botStats]);
  //   // });
  //   //getStatusBot()
  // }, []);

  useEffect(() => {
    socket.on("messageFromServerMain", (pesan) => {
      setPingInStatus([...pingInStatus, pesan]);
    });
    /*
      setSocket(initSocket)
      if(!socket) return
      initSocket.on('message', (pesan) => {
        setPingInStatus([...pingInStatus, pesan])
      })*/
  }, []);

  const pingStatus = () => {
    const ping = "<ping>";
    setPingInStatus([...pingInStatus, ping]);
  };

  const addingBot = () => {
    //   const response = api.post('/api/dashboard')
    // socket.on("testInc", (data) => {
    //   const botStats = {
    //     name: "hibiki",
    //     health: data,
    //     hunger: "5",
    //   };
    //   const botStats2 = {
    //     name: "konata",
    //     health: "100",
    //     hunger: data,
    //   };
    //   setBotNames([...botNames, botStats]);
    //   setTimeout(() => {
    //     setBotNames([...botNames, botStats2]);
    //   }, 5000);
    // });
  };

  const displayWorld = () => {
    // const httpsc = "http://localhost:3007";
    // setBotViewer(httpsc);
    setSharedBotData("data dari D-menu")
  };

  const displayBotMenu = (returner) => {
    //if (!showedBotMenu) {
    setShowedBotMenu(returner);
    //} else { setShowedBotMenu(false) }
  };

  const debug_button = () => {

    const userAccount = cookiesNow.split("?");
    const fulldataObj = {
      toUserId: "mcAi1",
      data: {
        event: "debug_mode",
        cmd: {
          clientId: userAccount[1],
          botName: "koko"
      },
      }
    };
    socket.emit("dataClient2Client", fulldataObj);

    // if (!testMod) {
    //   setTestMod("true");
    //   const attac = {
    //     1: {
    //       name: "ale",
    //       health: "10",
    //       hunger: "75",
    //     },
    //   };
    //   setBotId(attac);
    // } else {
    //   setBotId({});
    //   setTestMod(undefined);
    // }
  };

  // useEffect(() => {
  //   // taruh logika re-renderer
  //   // const clientIdSocket = "mcCl2"; // buatin register untuk socket nya
  //   //console.log("client registered to server")

  //   const updaterBotStats = () => {
  //       let listUpdateBot = { ...botId };
  //       listUpdateBot[398420] = {
  //               name: "miko",
  //               health: 89,
  //               hunger: 45
  //       };
  //       setBotId(listUpdateBot);
  //   };
  //   updaterBotStats();
  // }, []);

  return (
    <div>
      <h1>Adminstrator</h1>
      <div className="bot-stay">
        {/* <div><h1>data utama: {cookiesNow}</h1></div> */}
        <ScroolToBottom className="bot-container">
          {/* {botNames.map((bot, index) => (
          <div className="bot-list" key={index}>
            <p>{bot.name}</p>
            <div className="bot-bar">
              <div className="health" style={{ width: `${bot.health}%` }}></div>
            </div>
            <div className="bot-bar-H">
              <div className="hunger" style={{ width: `${bot.hunger}%` }}></div>
            </div>
          </div>
        ))} */}

          {/* <div nyalakan sebagai contoh
            className="wrap-config"
            style={
              showedBotMenu
                ? { height: `${showedBotMenu}px` }
                : { height: `75px` }
            }
          >
            <BotsList
              onToggle={displayBotMenu}
              name="example"
              health="1"
              hunger="2"
            />
            {showedBotMenu ? <BotConfiguration /> : <></>}
          </div> */}

          {/* {Object.entries(botId).map(([key, bot]) => (
            <BotAvailable
              key={key} // Gunakan bot.id sebagai key
              name={bot.name}
              health={bot.health}
              hunger={bot.hunger}
            />
          ))} */}
          {Object.values(sharedBotData).map((bot) => (
            <BotAvailable
              key={bot.id}
              name={bot.name}
              health={bot.health}
              hunger={bot.hunger}
            />
          ))}

          {/* <BotAvailable name="loi" health="23" hunger="74" />
          <BotAvailable name="aru" health="10" hunger="67" />
          <BotAvailable name="liki" health="43" hunger="34" />
          <BotAvailable name="aruji" health="23" hunger="34" />
          <BotAvailable name="arudongo" health="10" hunger="7" /> */}
        </ScroolToBottom>
      </div>
      {/* <div className="the-viewer-bot">
        <p>name: </p>
        <p>code: </p>
        {botViewer ? <iframe src={botViewer} frameborder="30"></iframe> : <></>}
      </div> */}

      <div className="status-chat">
        <ScroolToBottom className="status-scrool">
          <h4>status</h4>
          {pingInStatus.map((message, index) => (
            <div className="status-message" key={index}>
              <p>{message}</p>
            </div>
          ))}
        </ScroolToBottom>
      </div>
      <div className="toolkit-bot">
        <button onClick={handleOpenModal}>create</button>
        <button onClick={pingStatus}>ping message</button>
        <button onClick={displayWorld}>viewer</button>
        <button onClick={debug_button}>debug-info</button>
        <p>{humanError}</p>
      </div>
      <PopupTools
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
        initialData={{ name: "", addressPort: "", password: "" }}
      />
      {/* <div>
        <p>{modalResult?.name}</p>
        <p>{modalResult?.addressPort}</p>
        <p>{modalResult?.password}</p>
      </div> */}
    </div>
  );
};

export default Dashboard_menu;
