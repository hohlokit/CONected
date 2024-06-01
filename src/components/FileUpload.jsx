import React, { forwardRef, useState } from "react";
import cn from "classnames";

import Error from "./Error";

const FileUpload = forwardRef(
  (
    {
      name,
      accept = ".png, .jpg, .jpeg",
      className,
      defaultValue,
      label,
      error,
      onChange,
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    const [file, setFile] = useState(null);
    const handleChange = (e) => {
      onChange(e);
      setFile(e.target.files[0]);
    };

    return (
      <div className={cn("flex flex-col w-full", wrapperClassName)}>
        <span className="text-steam-text-secondary">{label}</span>
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-col justify-center items-center">
            <label
              className={cn(
                "flex items-center justify-center cursor-pointer bg-steam-component-input border-steam-component-input font-normal text-base text-white rounded w-28 h-28 outline-none hover:bg-steam-component-inputHover"
              )}
              htmlFor={name}
            >
              <img
                width={96}
                height={96}
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://res.cloudinary.com/dxdrvm3gs/image/upload/v1717197948/ceyrzewegjlm0rk4ooo3.png"
                }
              />
              <input
                accept={accept}
                id={name}
                name={name}
                ref={ref}
                className={cn("hidden w-24", className)}
                value={defaultValue}
                type="file"
                onChange={handleChange}
                {...props}
              />
            </label>
          </div>
          <span className="text-white h-4">{file && "Аватар завантажено"}</span>
        </div>

        <Error>{error}</Error>
      </div>
    );
  }
);

export default FileUpload;
