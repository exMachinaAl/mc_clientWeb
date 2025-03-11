import React, { useState, useEffect } from "react";
import "./BotsList.css";

const BotsList = (bot) => {
  const [botStats, setBotStats] = useState(bot.name !== undefined);
  const [botClick, setBotClick] = useState(undefined);
  const [showMenuForParent, setShowMenuForParent] = useState(false);

  useEffect(() => {
    setBotStats(bot.name !== undefined);
  }, [bot]);

  
  const showMenu = () => {
    if (!botClick) {
      setBotClick(true);
      bot.onToggle("150");
    } else {
      setBotClick(false);
      bot.onToggle();
    }
  };


  return (
    <div>
      {botStats ? (
        <div onClick={showMenu} className="bots-available">
          {/* {botClick ? <div>halo</div> : <></>} */}
          <p>{bot.name}</p>
          <div className="bots-health">
            <div className="health" style={{ width: `${(bot.health*5)}%` }}></div>
          </div>
          <div className="bots-hunger">
            <div className="hunger" style={{ width: `${(bot.hunger*5)}%` }}></div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BotsList;
