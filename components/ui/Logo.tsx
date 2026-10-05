import Image from "next/image";

// Official ENGOBO GROUP logo, transparent background, in two colorways:
// logo-light.png (original navy/gold) for light surfaces and logo-dark.png
// (navy turned white) for dark surfaces. `auto` follows the site theme;
// `onDark` is for sections that are always navy (footer).
export default function Logo({
  variant = "auto",
  className = "",
}: {
  variant?: "auto" | "onDark";
  className?: string;
}) {
  const size = "h-12 w-auto object-contain sm:h-14";

  return (
    <span className={`inline-flex items-center ${className}`}>
      {variant === "auto" && (
        <Image
          src="/logo-light.png"
          alt="ENGOBO GROUP"
          width={1443}
          height={958}
          priority
          className={`${size} dark:hidden`}
        />
      )}
      <Image
        src="/logo-dark.png"
        alt={variant === "auto" ? "" : "ENGOBO GROUP"}
        aria-hidden={variant === "auto" ? true : undefined}
        width={1443}
        height={958}
        className={variant === "auto" ? `${size} hidden dark:block` : size}
      />
    </span>
  );
}
