import Image from "next/image";
import { unsplashPhotos, unsplashUrl } from "@/lib/images";

// Renders the real photo mapped in lib/images.ts for this content id. Falls
// back to a branded gradient placeholder for any id not yet mapped (e.g.
// newly added content) until it's swapped for real ENGOBO GROUP photography
// via the media library (cahier des charges §33).

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
  id: string;
  className?: string;
  priority?: boolean;
}) {
  const photoHash = unsplashPhotos[id];

  if (photoHash) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={unsplashUrl(photoHash)}
          alt=""
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  const gradient = gradients[hashOf(id) % gradients.length];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
    >
      <div className="absolute inset-0 opacity-10 [background-image:repeating-linear-gradient(45deg,#fff_0,#fff_1px,transparent_1px,transparent_14px)]" />
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
