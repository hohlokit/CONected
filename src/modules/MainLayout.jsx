import React from "react";
import Header from "./Header";

const MainLayout = ({ children }) => {
  return (
    <div className="pt-24 w-full pb-12">
      <Header />
      <div className="px-8 xl:px-96 gl:px-64 lg:px-40">{children}</div>
    </div>
  );
};

export default MainLayout;
