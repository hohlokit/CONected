import React from "react";
import { Link } from "../components";

const Header = () => {
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
