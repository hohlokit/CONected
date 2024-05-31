import { Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";
import {
  Login,
  ResetPassword,
  Registration,
  Vacancies,
  Profile,
  NewPassword,
  Vacancy,
} from "../pages";
import { MainLayout } from "../modules";
import CreateVacancy from "../modules/forms/CreateVacancy";

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
  {
    element: <NewPassword />,
    path: "update-password",
  },
];

const protectedRoutes = [
  {
    element: <Vacancies />,
    path: "vacancies",
  },
  {
    element: <Profile />,
    path: "profile",
  },
  {
    element: <CreateVacancy />,
    path: "create-vacancy",
  },

  {
    element: <Vacancy />,
    path: "vacancy/:id",
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/profile" />} />
      {routes.map(({ element, path }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route element={<ProtectedRoute />}>
        {protectedRoutes.map(({ element, path }) => (
          <Route
            key={path}
            path={path}
            element={<MainLayout>{element}</MainLayout>}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
