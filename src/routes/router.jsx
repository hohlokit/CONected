import { Route, Routes } from "react-router-dom";

import { Login, ResetPassword, Registration } from "../pages";

const routes = [
  {
    element: <Registration />,
    path: "registration",
  },
  {
    element: <Login />,
    path: "login",
  },
  {
    element: <ResetPassword />,
    path: "reset-password",
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
