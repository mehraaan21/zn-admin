/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'stage.znsoftech.com',
        pathname: '/api/v1/storage/**',
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
