import Image from "next/image";

// Official ENGOBO GROUP logo (public/lcd.png). The source file has an
// opaque white background, so on dark sections (variant="light") it's
// mounted on a small white card rather than floating directly on navy.
export default function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const image = (
    <Image
      src="/lcd.png"
      alt="ENGOBO GROUP"
      width={1484}
      height={1060}
      priority
      className="h-12 w-auto object-contain sm:h-14"
    />
  );

  if (variant === "light") {
    return (
      <div
        className={`inline-flex items-center rounded-xl bg-white px-3 py-2 shadow-sm ${className}`}
      >
        {image}
      </div>
    );
  }

  return <div className={`inline-flex items-center ${className}`}>{image}</div>;
}
