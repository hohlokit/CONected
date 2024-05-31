import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ children, onClick, disabled, type = "button", ...props }) => {
  const navigate = useNavigate();
  return (
    <button
      className="text-white px-4 py-2 rounded bg-gradient-to-r from-[#ff0e0e] from-0% to-[#ff6c6c] hover:from-30% active:from-50%"
      onClick={() => {
        localStorage.removeItem("user");
        localStorage.removeItem("auth_token");

        navigate("/login");
      }}
      type={type}
      disabled={disabled}
      {...props}
    >
      Вийти
    </button>
  );
};

export default Logout;
