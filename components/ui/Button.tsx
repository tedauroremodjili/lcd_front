import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline-light" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-navy hover:bg-gold-light hover:shadow-lg hover:shadow-gold/40 shadow-sm shadow-gold/30",
  secondary:
    "bg-navy text-white hover:bg-navy-light",
  "outline-light":
    "border border-white/60 text-white hover:bg-white hover:text-navy",
  ghost:
    "border border-subtle/20 text-heading hover:bg-navy hover:text-white",
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  target?: string;
  rel?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  disabled,
  target,
  rel,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wide btn-sheen transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
