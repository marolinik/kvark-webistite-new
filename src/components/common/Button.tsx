import { type ReactNode, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium";
}

function Button({
  children,
  variant = "primary",
  size = "medium",
  className,
  disabled,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary:
      "bg-linear-to-b from-primary-start to-primary-end text-white shadow-button-primary border border-button-primary hover:opacity-90",
    secondary:
      "bg-secondary text-white hover:bg-secondary/90 shadow-button-secondary border border-button-secondary",
    outline:
      "bg-button-outline-bg text-button-outline-text shadow-button-outline hover:opacity-90",
    ghost: "bg-neutral-0 text-primary-end",
  };

  const sizeClasses = {
    small: "h-10 px-5 py-3 text-xs lg:text-sm",
    medium: "h-13 px-6 py-4 text-sm lg:text-base",
  };

  return (
    <button
      className={`font-normal w-max transition-colors flex items-center justify-center gap-2.5 rounded-[3.75rem] ${
        variantClasses[variant]
      } ${sizeClasses[size]} ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } ${className || ""}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
