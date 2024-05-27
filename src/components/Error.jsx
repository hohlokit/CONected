import React from "react";

const Error = ({ children }) => {
  return (
    <div className="h-4 pt-1 pl-2 text-left text-red-400">{children}</div>
  );
};

export default Error;
