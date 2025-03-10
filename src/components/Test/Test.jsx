import React, { useState, useEffect } from "react";
import api from "../../config/axiosCg";
import { ToastContainer, toast } from "react-toastify";
import io from 'socket.io-client'
import "./Test.css";

const socket = io('http://localhost:3002')

function Test() {
  const [message, setMessage] = useState([]);
  const [addBot, setAddBot] = useState("");
  const [slideHtml, setSlideHtml] = useState(true);
  const [povPort, setPovPort] = useState();

  useEffect(() => {
    const handlerPort = (recieve) => {
      setPovPort(recieve)
    }

    socket.on('portPovBot', handlerPort)

    return () => {
      socket.off('portPovBot', handlerPort)
    }

  }, [])

  const tranformHtml = () => {
    if(slideHtml === true) {
      setSlideHtml(false)
    } else {
      setSlideHtml(true)
    }
  }

  const popUpInp = () => {
    const nameBot = window.prompt('tulis nama bot mu', 'qiqi')

    if (nameBot != null) {
      setMessage([...message, nameBot])
    }
  }

  const addingBot = async (e) => {
    e.preventDefault()
    try {
      // const response = await api.get("/api/test/get");
      // const response = await api.post("/api/test/post", {
      //   addBot,
      // });
      socket.emit('addBot', addBot)
      socket.on('infoBot', (response) => {
        setMessage([...message, response]);
      })
    } catch (e) {
      const fail = "error fetch";
      setMessage(fail);
    }
  };

  const controlBot = () => {
    socket.emit("simsViewer", addBot)

    setSlideHtml(true)
  }

  const setPovBot = (namesBot) => {
    socket.emit('povBot', namesBot)

     // ada kesalab di sinj yaitu kebocoran memori
  }

  return (
    <div>
      <div className="test-container">
        <div className="container-bot">
          <h4>test-med</h4>
          {message.map((mcName, index) => (
            <div key={index}>
              <p>{mcName}</p>
              <button onClick={() => setPovBot(mcName)}>POV</button>
            </div>
          ))}
          {/* <p>{message}</p> */}
        </div>
        <form onSubmit={addingBot}>
          <input
            type="text"
            placeholder="bot-name"
            value={addBot}
            onChange={(e) => setAddBot(e.target.value)}
            required
          />
          <button type="submit">add</button>
        </form>
        <button onClick={() => toast("halo")}>notify</button>
        <ToastContainer />
        <button onClick={popUpInp}>add bot window</button>
        {slideHtml ?
          (<button onClick={() => setSlideHtml(false)}>choose bot</button>)
          :
          ( 
          <div className="add-bot">
            <form onSubmit={controlBot}>
            <input type="text" placeholder="namesBot" value={addBot} onChange={(e) => setAddBot(e.target.value)} required/>
            <button type="submit">control</button>
            </form>
          </div> 
          )
        }
        {/* <button >control bot</button> */}
      </div>
    </div>
  );
}

export default Test;
