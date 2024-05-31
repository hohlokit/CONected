import React, { forwardRef, useState } from "react";
import cn from "classnames";

import Error from "./Error";
import { Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { PHONE, REQUIRED } from "../services/validation";

const PhoneInput = forwardRef(
  (
    {
      name,
      defaultValue,
      type,
      className,
      label,
      error,
      mask,
      control,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col">
        <label
          className={cn("flex flex-col text-steam-text-secondary ")}
          htmlFor={name}
        >
          {label}
          <Controller
            control={control}
            rules={{
              required: REQUIRED,
              ...PHONE,
            }}
            name={name}
            render={({ field: { onBlur, onChange, name, value } }) => (
              <PatternFormat
                className={cn(
                  "bg-steam-component-input border-steam-component-input font-normal text-base text-white rounded p-2.5 w-full min-w-64 lg:min-w-96 outline-none hover:bg-steam-component-inputHover",
                  className
                )}
                format={mask}
                name={name}
                allowEmptyFormatting
                mask="_"
                value={value}
                {...props}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </label>
        <Error>{error}</Error>
      </div>
    );
  }
);

export default PhoneInput;
