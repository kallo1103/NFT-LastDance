/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enable SWC's React optimization features
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig; 