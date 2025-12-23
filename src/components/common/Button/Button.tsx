import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning" | "inherit";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disableElevation?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  id?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "contained",
  color = "primary",
  size = "medium",
  fullWidth = false,
  startIcon,
  endIcon,
  disableElevation = false,
  disabled = false,
  ariaLabel,
  children,
  className = "",
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  id,
  ...rest
}) => {
  // Map variant and color to Tailwind classes using theme tokens
  let variantClass = "";
  if (variant === "contained") {
    variantClass = `bg-${color} text-white hover:bg-${color}-dark`;
  } else if (variant === "outlined") {
    variantClass = `bg-transparent border border-${color} text-${color} hover:bg-${color}-light`;
  } else {
    variantClass = `bg-transparent text-${color} hover:bg-${color}-light`;
  }

  let sizeClass = "";
  if (size === "small") {
    sizeClass = "px-sm py-sm text-sm min-h-sm";
  } else if (size === "large") {
    sizeClass = "px-lg py-lg text-lg min-h-lg";
  } else {
    sizeClass = "px-md py-md text-base min-h-md";
  }

  let base = "inline-flex items-center justify-center font-medium rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2";
  if (!disableElevation && variant === "contained" && !disabled) {
    base += " shadow-md hover:shadow-lg";
  }
  if (fullWidth) base += " w-full";

  return (
    <button
      type="button"
      id={id}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`${base} ${variantClass} ${sizeClass} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      {...rest}
    >
      {startIcon && <span className="mr-2 -ml-1 flex items-center">{startIcon}</span>}
      <span>{children}</span>
      {endIcon && <span className="ml-2 -mr-1 flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
