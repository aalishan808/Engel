import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // Remove React-specific hydration warning attributes
    reactRemoveProperties: true,
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
    images: {
    domains: [
      'i.ibb.co', // ImgBB domain
      'images.unsplash.com', // Example additional domain
      'localhost', // For development
    ],
  },
  /* config options here */
};

export default nextConfig;
