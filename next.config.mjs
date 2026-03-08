/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.redd.it" },
      { protocol: "https", hostname: "*.reddit.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "*.ytimg.com" },
      { protocol: "https", hostname: "*.newsapi.org" },
      { protocol: "https", hostname: "**.co.uk" },
      { protocol: "https", hostname: "**.com" },
    ],
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["google-trends-api"],
  },
};

export default nextConfig;
