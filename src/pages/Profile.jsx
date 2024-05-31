import React from "react";

import { EditProfileForm, ProfileInfo, ChangePasswordForm } from "../modules";
import { Card, Logout } from "../components";

const Profile = () => {
  return (
    <div className="flex flex-col gap-8">
      <ProfileInfo />
      <Card className={"flex-col xl:flex-row gap-8"}>
        <EditProfileForm />
        <ChangePasswordForm />
      </Card>
      <div className="flex flex-row justify-end">
        <Logout />
      </div>
    </div>
  );
};

export default Profile;
