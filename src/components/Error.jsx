import React from "react";

const Error = ({ children }) => {
  return (
    <div className="min-h-4 pt-1 pl-2 text-left text-red-400 max-w-[384px]">{children}</div>
  );
};

export default Error;
