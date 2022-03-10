// /** @type {import('next').NextConfig} */
// module.exports = {
//   images: {
//     domains: ['via.placeholder.com','wishwheels.s3.us-east-2.amazonaws.com'],
//   },
//   reactStrictMode: false,
// }
const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },

  images: {
    domains: ["wishwheels.s3.us-east-2.amazonaws.com", "media.istockphoto.com"],
  },
});
