import React from "react";
import { NavLink } from "react-router-dom";

/**
 * LinkProps
 * - A reusable link component using React Router NavLink
 * - Uses children instead of label prop for flexible content
 * - Token-driven color and size styling
 */
interface LinkProps {
  to: string;
  title?: string;
  id?: string;
  className?: string;
  target?: string;
  color?: "primary" | "secondary" | "inherit";
  size?: "small" | "medium" | "large";
  underline?: "none" | "hover" | "always";
  onFocus?: React.FocusEventHandler<HTMLAnchorElement>;
  onBlur?: React.FocusEventHandler<HTMLAnchorElement>;
  tabIndex?: number;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-label'?: string;
  'aria-current'?: boolean | "page" | "step" | "location" | "date" | "time";
  children?: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({
  to,
  title,
  id,
  className,
  color = "primary",
  size = "medium",
  underline = "hover",
  onFocus,
  tabIndex,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  target,
  'aria-current': ariaCurrent,
  onBlur,
  'aria-label': ariaLabel,
  children,
}) => {
  const colorStyle: React.CSSProperties =
    color === "inherit"
      ? { color: "inherit" }
      : { color: `var(--color-${color})` };

  const hoverColorStyle: React.CSSProperties =
    color === "inherit"
      ? {}
      : { "--hover-color": `var(--color-${color}-dark)` } as React.CSSProperties;

  const sizeStyle: React.CSSProperties = {
    fontSize: `var(--font-size-${size})`,
  };

  // Determine text decoration based on underline prop
  const underlineStyle =
    underline === "always"
      ? { textDecoration: "underline" }
      : underline === "hover"
      ? { textDecoration: "underline" }
      : { textDecoration: "none" };

  return (
    <NavLink
      to={to}
      id={id}
      title={title}
      onFocus={onFocus}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      tabIndex={tabIndex}
      onBlur={onBlur}
      aria-current={ariaCurrent}
      target={target}
      className={`link ${underline === "hover" ? "link-hover" : ""} ${className || ""}`}
      style={{
        ...colorStyle,
        ...hoverColorStyle,
        ...sizeStyle,
        ...underlineStyle,
      }}
    >
      {children}
    </NavLink>
  );
};

export default Link;
