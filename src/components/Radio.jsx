import React, { forwardRef } from "react";
import Error from "./Error";

const RadioGroup = forwardRef(
  ({ name, error, buttons = [], label, ...props }, ref) => {
    return (
      <div>
        <span className="text-steam-text-secondary">{label}</span>
        <div className="flex flex-row items-center justify-start gap-4 py-2.5  w-full min-w-64 lg:min-w-96">
          {buttons.map(({ value, label }) => {
            return (
              <label
                key={value}
                className="flex flex-row gap-2 text-white"
                htmlFor={value}
              >
                <input
                  value={value}
                  id={value}
                  name={name}
                  type="radio"
                  ref={ref}
                  {...props}
                />
                {label}
              </label>
            );
          })}
        </div>
        <Error>{error}</Error>
      </div>
    );
  }
);

export default RadioGroup;
