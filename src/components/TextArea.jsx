import React, { forwardRef } from "react";
import cn from "classnames";

import Error from "./Error";

const TextArea = forwardRef(
  ({ name, defaultValue, type, className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <label
          className={cn("flex flex-col text-steam-text-secondary ")}
          htmlFor={name}
        >
          {label}
          <textarea
            rows={6}
            name={name}
            ref={ref}
            className={cn(
              "bg-steam-component-input border-steam-component-input font-normal text-base text-white rounded p-2.5 w-full min-w-64 lg:min-w-96 outline-none hover:bg-steam-component-inputHover",
              className
            )}
            value={defaultValue}
            type={type}
            {...props}
          />
        </label>
        <Error>{error}</Error>
      </div>
    );
  }
);

export default TextArea;
