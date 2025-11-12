/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // experimental: { appDir: true },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

console.log('NEXTAUTH_SECRET iz next.config.js:', process.env.NEXTAUTH_SECRET);

module.exports = nextConfig;
