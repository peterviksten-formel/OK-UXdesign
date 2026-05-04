import type { CSSProperties } from "react";

type IconProps = {
  name: string;
  size?: number;
  filled?: boolean;
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
};

/**
 * Material Symbols Rounded. Names: https://fonts.google.com/icons
 * Default decorative ,  pass aria-label to make semantic.
 */
export function Icon({
  name,
  size = 20,
  filled = false,
  className = "",
  style,
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
}: IconProps) {
  const role = ariaLabel ? "img" : undefined;
  return (
    <span
      className={`material-symbols-rounded ${filled ? "filled" : ""} ${className}`}
      style={{ fontSize: size, ...style }}
      aria-hidden={ariaLabel ? undefined : ariaHidden}
      aria-label={ariaLabel}
      role={role}
    >
      {name}
    </span>
  );
}
