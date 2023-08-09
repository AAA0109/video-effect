const path = require("path");
const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
    prependData: `@import "_theme.scss";`,
  },
  pwa: {
    disable: true,
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
});

module.exports = nextConfig;
