import React from "react";
import { useLocation } from "react-router-dom";

import { Card, Link } from "../components";

const AuthLayout = ({ children, horizontal }) => {
  const { pathname } = useLocation();
  const currentRoute = pathname.replace("/", "");

  const variants = {
    login: (
      <span className="text-white">
        Ще не маєш аккаунту? <br />
        Тоді{" "}
        <Link className="font-bold" to="/registration">
          приєднуйся до нас
        </Link>
      </span>
    ),
    registration: (
      <span className="text-white">
        Вже маєте аккаунт? <br />
        <Link className="font-bold" to="/login">
          Вхід
        </Link>
      </span>
    ),
  };

  return (
    <Card>
      <div className="flex flex-row">
        <div className="border-r pr-8 border-steam-component-input">
          {children}
        </div>
        <div className="pl-8 flex sm:flex-col items-center justify-center text-center">
          {variants[currentRoute]}
        </div>
      </div>
    </Card>
  );
};

export default AuthLayout;
