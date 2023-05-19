/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // output: "export",

  images: {
    loaderFile: '/lib/CloudinaryLoader.js',
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
