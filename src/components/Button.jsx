import React, { forwardRef } from "react";

const Button = forwardRef(
  ({ children, onClick, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className="text-white px-4 py-2 rounded bg-gradient-to-r from-[#06BFFF] from-0% to-[#2D73FF] hover:from-30% active:from-50%"
        onClick={onClick}
        type={type}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
