/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: "https://wish-work.herokuapp.com/",
  },
};

module.exports = nextConfig;
