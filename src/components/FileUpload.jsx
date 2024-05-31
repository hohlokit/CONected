import React, { forwardRef } from "react";
import cn from "classnames";

import Error from "./Error";

const FileUpload = forwardRef(
  ({ name, className, defaultValue, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col h-[84px]">
        <label
          className={cn("flex flex-col text-steam-text-secondary ")}
          htmlFor={name}
        >
          {label}
          <input
            name={name}
            ref={ref}
            className={cn(
              "bg-steam-component-input border-steam-component-input font-normal text-base text-white rounded p-2.5 py-[7px] h-[44px] w-full min-w-64 max-w-64 lg:min-w-96 lg:max-w-96 outline-none hover:bg-steam-component-inputHover",
              className
            )}
            value={defaultValue}
            type="file"
            {...props}
          />
        </label>
        <Error>{error}</Error>
      </div>
    );
  }
);

export default FileUpload;
