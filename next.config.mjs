/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ hostname: '*' }],
  },
  transpilePackages: ['lucide-react'],
};

export default nextConfig;
