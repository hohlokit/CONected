import cn from "classnames";
import React from "react";
import { Link } from "react-router-dom";

const PrimaryLink = ({ children, to, className, ...props }) => {
  return (
    <Link
      to={to}
      className={cn(
        "text-white underline-offset-4 hover:text-steam-text-secondary hover:underline",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default PrimaryLink;
