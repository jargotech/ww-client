const withPWA = require("next-pwa");
module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: [
      "wishwheels.s3.us-east-2.amazonaws.com",
      "media.istockphoto.com",
      "wishwheels-assets.s3.ap-south-1.amazonaws.com",
    ],
  },
});
