import React, { useCallback, useState } from "react";
import cn from "classnames";

import Field from "./Field";

export const TEXT_INPUT_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TERTIARY: "tertiary",
  DISABLED: "disabled",
};

export const FIELD_STYLE_VARIANTS = {
  [TEXT_INPUT_VARIANTS.PRIMARY]:
    "focus:bg-accent-primary focus:text-white focus:!shadow-none placeholder:focus:text-white",
  [TEXT_INPUT_VARIANTS.TERTIARY]:
    "bg-base-200 text-base-700 font-light leading-120",
};

const TextInput = ({
  wraperClassName,
  icon,
  error,
  variant,
  label,
  labelClassName,
  isDisabled,
  ...props
}) => {
  const [active, setActive] = useState(false);

  const className = cn(
    "w-full bg-white outline-none pl-4 py-3.5 rounded-2xl text-22 hover:shadow-black",
    {
      "pl-9": icon,
      "!shadow-error": error,
    },
    FIELD_STYLE_VARIANTS[variant],
    props.className
  );

  //When focusing on a field with a SECONDARY variant, a label appears above it
  const handleFocus = useCallback(() => {
    if (label && variant === TEXT_INPUT_VARIANTS.SECONDARY) {
      setActive(true);
    }
  }, [label]);

  //When the focus disappears from the field and with the SECONDARY option the label is in the default place
  const handleBlur = useCallback(() => {
    if (label && variant === TEXT_INPUT_VARIANTS.SECONDARY) {
      setActive(false);
    }
  }, [label]);

  return (
    <Field
      icon={icon}
      label={label}
      containerClassname={wraperClassName}
      labelClassName={labelClassName}
      isShownLabel={props?.value || active}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <input
        placeholder={props.placeholder}
        className={className}
        disabled={isDisabled}
        {...props}
      />
    </Field>
  );
};

export default TextInput;
