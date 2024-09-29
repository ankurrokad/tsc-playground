import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  dest: 'public', // Location where the service worker will be generated
  register: true, // Automatically registers the service worker
  skipWaiting: true, // Updates the service worker without needing user interaction
})({
  reactStrictMode: true,
  swcMinify: true, // Optional: Enable SWC for faster builds
  // Additional config options if needed
});

export default nextConfig;
