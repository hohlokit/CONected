import React, { useState } from "react";

import { useAxiosInterceptors } from "../hooks/useAxiosInterceptors";
import { Button, Card } from "../components";

const ProfileInfo = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [avatarSrc, setAvatarSrc] = useState(user.avatar || "");
  useAxiosInterceptors();

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
    <Card>
      <div className="flex flex-row gap-8 text-white flex-col sm:flex-row w-full sm:justify-start">
        <img
          onError={onError}
          className="mx-auto my-0 sm:m-0 w-24 h-24 object-contain"
          alt="avatar"
          src={avatarSrc}
        />
        <div className="flex flex-row gap-8 sm:justify-between">
          <div className="flex flex-col">
            <span>Ім`я: </span>
            {/* <span>Курс: </span> */}
            <span>Локація: </span>
            <span>Email: </span>
            <span>Телефон: </span>
          </div>
          <div className="flex flex-col">
            <span className="capitalize font-lg font-medium">{name}</span>
            {/* <span>{user.course || "Не вказано"}</span> */}
            <span>{user.location || "Не вказано"}</span>
            <span>{user.email || "Не вказано"}</span>
            <span>{user.phone || "Не вказано"}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileInfo;
