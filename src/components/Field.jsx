import React from "react";
import cn from "classnames";
import Error from "src/components/Error";

const Field = ({
  children,
  icon,
  label,
  containerClassname,
  labelClassName,
  isShownLabel,
  showError,
  error,
  ...props
}) => {
  return (
    <div className={cn("relative", containerClassname)} {...props}>
      {icon && (
        <div className={cn("absolute h-full left-1 top-1/4")}>{icon}</div>
      )}
      {Boolean(label) && (
        <label
          className={cn(
            "absolute left-4 top-4 capitalize text-22 ease-out duration-300 text-base-800",
            labelClassName,
            {
              "-top-6 scale-75 left-3 origin-left !text-black bg-transparent":
                isShownLabel,
            }
          )}
        >
          {label}
        </label>
      )}
      {children}
      <Error showError={showError}>{error}</Error>
    </div>
  );
};

export default Field;
