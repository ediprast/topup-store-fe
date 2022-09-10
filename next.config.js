/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["api-bwa-storegg.herokuapp.com"],
  },
};

module.exports = nextConfig;
