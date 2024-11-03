/** @type {import('next').NextConfig} */
const withImages = require("next-images");
module.exports = {
  async rewrites() {
    const catalogURL = process.env.CATALOG_URL || "http://localhost:8000";
    const authURL = process.env.AUTH_URL || "http://localhost:8000";

    return [
      {
        source: "/catalog/:route*",
        destination: `${catalogURL}/catalog/:route*`,
      },
      {
        source: "/auth/:route*",
        destination: `${authURL}/auth/:route*`,
      },
      {
        source: "/shopping/:route*",
        destination: `${authURL}/shopping/:route*`,
      },
    ];
  },
};
