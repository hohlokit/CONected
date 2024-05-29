import { Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";
import { Login, ResetPassword, Registration, Vacancies } from "../pages";
import { MainLayout } from "../modules";

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

const protectedRoutes = [
  {
    element: <Vacancies />,
    path: "vacancies",
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map(({ element, path }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route element={<ProtectedRoute />}>
        {protectedRoutes.map(({ element, path }) => (
          <Route key={path} path={path} element={<MainLayout>{element}</MainLayout>} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
