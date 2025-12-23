## General Guidelines for Common Components

1. **Reusability First**

   * Components must be generic enough to be reused across pages.
   * Avoid hardcoding strings, labels, or API endpoints.

2. **TypeScript Typing**

   * Always use **explicit props interfaces**.
   * Avoid using `any` – prefer `unknown`, `string`, `number`, `boolean`, or generics.

3. **Props Management**

   * Accept only **necessary props**.
   * Provide **sensible defaults** using `defaultProps` or default values in destructuring.

4. **Styling**

   * Use **TailwindCSS utility classes** for styling.
   * Allow overriding styles via a `className` prop.
   * Do not inline hardcoded styles unless necessary.

5. **Accessibility (a11y)**

   * Use semantic HTML (`button`, `label`, `input`, etc.).
   * Add `aria-*` attributes where needed.
   * Ensure keyboard navigation (e.g., `tabIndex`, `onKeyDown`).

6. **Error Boundaries & Guards**

   * Validate props before rendering (e.g., don’t render an image if `src` is empty).
   * Use **fallback UI** where applicable.

---

## Common Props to Support

Every **common component** should, where applicable, support:

* `children?: React.ReactNode` → for nested content.
* `className?: string` → to extend styling.
* `id?: string` → for DOM targeting.
* `name?: string` → for DOM targeting.
* `value?: "string" | "Object" | "number"` → for value display.
* `onClick?: () => void` → if clickable.
* `disabled?: boolean` → for buttons/inputs.
* `variant?: "primary" | "secondary" | "danger" | "link"` → for design system variants.
* `size?: "sm" | "md" | "lg"` → for consistent sizing.

---

## Props & Practices to Avoid

* Avoid passing **inline style objects** (`style={{ ... }}`) unless dynamic runtime styling is required.
* Avoid **boolean flags explosion** (e.g., `isPrimary`, `isSecondary`, `isDanger`). Use a single `variant` prop.
* Avoid mixing **business logic** with UI components. (Keep API calls, state mutations outside).
* Avoid props that duplicate existing HTML attributes (e.g., `labelText` instead of using `children`).

---

## Example Component Template

```tsx
// src/components/Button.tsx
import React from "react";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger" | "link";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const baseStyles = "rounded-xl font-medium transition-colors duration-200";

const variantStyles: Record<string, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-black hover:bg-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
  link: "text-blue-600 underline hover:text-blue-800",
};

const sizeStyles: Record<string, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
};
```

---

## Guardrails

* All reusable components must:
  * Support **className** prop for style extension.
  * Be **typed** with TypeScript.
  * Be **stateless/pure** unless state is intrinsic (like Modal open/close).
* Use **default variants & sizes** to prevent visual inconsistencies.
* Document props inside the component file (via JSDoc or TS interface).
* Provide fallback rendering for required props (like `alt` text in images).
* Add **unit tests** for critical reusable components (e.g., Button, Input, Modal).

---

## Deliverable

When generating a new component, ensure:

1. It follows the above **prop conventions**.
2. It uses **TailwindCSS** for styling with `className` extendability.
3. It avoids **prop bloat** and uses `variant` / `size` patterns.
4. It is fully typed with TypeScript and safe for reuse across the project.
