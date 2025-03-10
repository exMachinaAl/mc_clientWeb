import React, { useState, useEffect } from "react";
import "./BotConfiguration.css";

const BotConfiguration = (props) => {
  return (
    <div>
      <div className="menu-container">
        <button>Home</button>
        <button>patrol</button>
        <button>farm</button>
        <button>beds</button>
      </div>
    </div>
  );
};

export default BotConfiguration;
