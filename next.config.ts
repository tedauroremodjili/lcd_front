import path from "node:path";
import type { NextConfig } from "next";

const assetUrl = new URL(process.env.NEXT_PUBLIC_ASSET_URL ?? "http://localhost:8000");

const apiOrigin = new URL(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api").origin;

const nextConfig: NextConfig = {
  // Same-origin proxy to Laravel so devices other than the dev PC can reach the API.
  async rewrites() {
    return [
      { source: "/laravel-api/:path*", destination: `${apiOrigin}/api/:path*` },
      { source: "/storage/:path*", destination: `${assetUrl.origin}/storage/:path*` },
    ];
  },
  // Lets phones/tablets on the same Wi-Fi load the dev server (otherwise Next blocks
  // its JS chunks from LAN origins and the page renders without any interactivity).
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*"],
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Laravel serves uploads from localhost during dev; in production the API host is used.
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: assetUrl.protocol.replace(":", "") as "http" | "https",
        hostname: assetUrl.hostname,
        port: assetUrl.port,
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
