import React from "react";

const Card = ({ children }) => {
  return (
    <div className="flex justify-center items-center rounded p-8 bg-steam-component-card">
      {children}
    </div>
  );
};

export default Card;
