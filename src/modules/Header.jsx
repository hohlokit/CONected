import React, { useState } from "react";
import { Link } from "../components";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [avatarSrc, setAvatarSrc] = useState(user.avatar || "");

  const name =
    user.type === "company"
      ? user.company
      : `${user.firstname} ${user.lastname}`;

  const onError = () => {
    setAvatarSrc(
      "https://res.cloudinary.com/dxdrvm3gs/image/upload/v1717090361/myqc8dkk0xttrwwkvkod.png"
    );
  };

  return (
    <div className="fixed top-0 px-12 py-8 shadow-md w-full bg-body bg-no-repeat bg-cover flex flex-row justify-between">
      <Link to="/vacancies">Вакансії</Link>
      <div className="flex flex-row items-center gap-2">
        <img
          onError={onError}
          className="rounded-full border border-steam-text-primary w-8 h-8 object-contain"
          alt="avatar"
          src={avatarSrc}
        />
        <Link className={"capitalize"} to="/profile">
          {name}
        </Link>
      </div>
    </div>
  );
};

export default Header;
