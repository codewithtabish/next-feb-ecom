import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["picsum.photos","randomuser.me","res.cloudinary.com"], // Allow external images from picsum.photos
  },
  /* config options here */
};

export default nextConfig;
