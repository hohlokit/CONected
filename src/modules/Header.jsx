import React from "react";
import { Link } from "../components";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const name =
    user.type === "company" ? user.name : `${user.firstname} ${user.surname}`;

  return (
    <div className="fixed top-0 px-12 py-8 shadow-md w-full bg-body bg-no-repeat bg-cover flex flex-row justify-between">
      <Link to="/vacancies">Вакансії</Link>
      <Link className={"capitalize"} to="/profile">
        Профіль
      </Link>
    </div>
  );
};

export default Header;
