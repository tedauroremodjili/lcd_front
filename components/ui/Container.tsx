import { ReactNode } from "react";

export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[2400px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 ${className}`}
    >
      {children}
    </div>
  );
}
