import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
