const withPWA = require("next-pwa")
const Dotenv = require("dotenv-webpack")

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development"
  },
  images: {
    domains: ['cdn.statically.io', 'lh3.googleusercontent.com'],
  },
  webpack: (config) => {
    config.plugins.push(new Dotenv({ silent: true }));
    return config;
  }
});