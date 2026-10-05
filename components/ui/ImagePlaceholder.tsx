import Image from "next/image";

// Renders an image uploaded through the back-office (URL or /storage path).
// Anything else (empty value, API down) gets a neutral gradient placeholder:
// the front ships no photos of its own. Images are loaded straight from the
// back-end (unoptimized) so Next's image cache never serves them once it is off.

const gradients = [
  "from-navy via-navy-light to-navy-dark",
  "from-navy-dark via-navy to-navy-light",
  "from-charcoal via-navy to-navy-dark",
  "from-navy via-navy-dark to-charcoal",
];

function hashOf(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export default function ImagePlaceholder({
  id,
  className = "",
  priority = false,
}: {
  id: string | null | undefined;
  className?: string;
  priority?: boolean;
}) {
  const key = id ?? "";
  const isRealUrl = /^(https?:)?\/\//.test(key) || key.startsWith("/storage/");

  if (isRealUrl) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={key}
          alt=""
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
          priority={priority}
          unoptimized
        />
      </div>
    );
  }

  const gradient = gradients[hashOf(key) % gradients.length];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-linear-to-br ${gradient} ${className}`}
    >
      <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,#fff_0,#fff_1px,transparent_1px,transparent_14px)]" />
      <svg
        width="15%"
        viewBox="0 0 38 34"
        fill="none"
        className="relative opacity-25"
        aria-hidden="true"
      >
        <rect x="10" y="12" width="4" height="14" fill="#F5F6F8" />
        <rect x="16" y="16" width="4" height="10" fill="#F5F6F8" />
        <rect x="22" y="19" width="4" height="7" fill="#D99A22" />
      </svg>
    </div>
  );
}
