import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // swcMinify is deprecated in latest Next.js - use the default optimization
  compiler: {
    reactRemoveProperties: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: [
      'i.ibb.co',
      'images.unsplash.com',
      'localhost',
    ],
  },
  // Add experimental CSS optimization for PrimeReact
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["primereact"]
  }
};

export default nextConfig;