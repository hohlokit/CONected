import React, { useEffect } from "react";
import { LoginForm } from "../modules";

const Login = () => {
  useEffect(() => {}, []);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <LoginForm />
    </div>
  );
};

export default Login;
