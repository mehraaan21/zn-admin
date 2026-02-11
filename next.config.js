/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stage.znsoftech.com",
      },
    ],
  },
};

module.exports = nextConfig;
