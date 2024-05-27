import React from "react";

const Card = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center rounded p-4 bg-steam-component-card">
      {children}
    </div>
  );
};

export default Card;
