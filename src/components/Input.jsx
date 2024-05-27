import React, { forwardRef } from "react";
import cn from "classnames";

import Error from "./Error";

const Input = forwardRef(
  ({ name, defaultValue, type, className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <label
          className={cn("flex flex-col text-steam-text-secondary ")}
          htmlFor={name}
        >
          {label}
          <input
            name={name}
            ref={ref}
            className={cn(
              "bg-steam-component-input border-steam-component-input font-normal text-base text-white rounded p-2.5 w-48  outline-none lg:w-96 hover:bg-steam-component-inputHover",
              className
            )}
            type={type}
            value={defaultValue}
            {...props}
          />
        </label>
        <Error>{error}</Error>
      </div>
    );
  }
);

export default Input;
