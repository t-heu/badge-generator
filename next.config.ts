/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "development" ? '' : '/badge-generator',
  images: {
    unoptimized: true, // Disable image optimization
  },
};

export default nextConfig;