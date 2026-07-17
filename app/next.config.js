/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ This makes Next generate /out on build (static export)
  output: "export",

  // ✅ Avoid next/image optimization (not available on shared hosting)
  images: { unoptimized: true },

  // ✅ Helps shared hosting route to /page/index.html
  trailingSlash: true,
};

module.exports = nextConfig;
