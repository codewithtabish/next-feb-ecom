import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["picsum.photos","randomuser.me"], // Allow external images from picsum.photos
  },
  /* config options here */
};

export default nextConfig;
