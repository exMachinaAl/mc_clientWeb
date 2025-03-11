import React from "react";

const SubTest = ({botStats, idx, hp, en}) => {
  return (
    <div>
      {botStats.map((bot) => (
        <div className="slots-bots" key={bot.id}>
          <p>{idx(bot.id, bot.name)}</p>
          <p>{bot.hp}</p>
          <p>{bot.en}</p>
        </div>
      ))}
    </div>
  );
};

export default SubTest;