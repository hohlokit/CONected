import React from "react";
import cn from "classnames";

const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "flex rounded p-8 bg-steam-component-card",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
