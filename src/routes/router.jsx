import React from "react";
import { Route, Routes } from "react-router-dom";

import { Login } from "../pages";

const routes = [
  {
    element: <Login />,
    path: "login",
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map(({ element, path }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
