/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  webpack: (config) => {
    config.module.rules.push({ test: /\.md$/, use: "raw-loader" });

    return config;
  },
};

module.exports = nextConfig;
