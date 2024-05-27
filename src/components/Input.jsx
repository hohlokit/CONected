import React, { forwardRef } from "react";
import cn from "classnames";

import Error from "./Error";

const Input = forwardRef(
  ({ name, defaultValue, type, className, label, error, ...props }, ref) => {
    console.log(props);
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
              "font-normal text-base text-black rounded p-2.5 w-48 border lg:w-96",
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
