import React, { useState } from "react";
import BotsList from "../BotsList/BotsList";
import BotConfiguration from "../BotConfiguration/BotConfiguration";
import './BotAvailable.css'

const BotAvailable = (bot) => {
  const [displayMenu, setDisplayMenu] = useState('')

  const displayBotMenu = (returner) => {
    setDisplayMenu(returner)
  }

  return (
    <div
      className="bot-available-container"
      style={displayMenu ? { height: `${displayMenu}px` } : { height: `75px` }}
    >
      <BotsList
        onToggle={displayBotMenu}
        name={bot.name || "."}
        health={bot.health}
        hunger={bot.hunger}
      />
      {displayMenu ? <BotConfiguration /> : <></>}
    </div>
  );
};

export default BotAvailable;
