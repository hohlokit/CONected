import React from "react";

import Header from "./Header";

const MainLayout = ({ children }) => {
  return (
    <div className="pt-24 w-full pb-12">
      <Header />
      <div className="px-8 mx-auto my-0">{children}</div>
    </div>
  );
};

export default MainLayout;
