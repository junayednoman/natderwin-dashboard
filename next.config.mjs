/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This allows all domains
      },
    ],
  },
  redirects: async () => [
    {
      source: "/",
      destination: "/admin/dashboard",
      permanent: false,
    },
  ],
};

export default nextConfig;
