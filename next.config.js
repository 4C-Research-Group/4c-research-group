/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google Images
      },
      {
        protocol: "https",
        hostname: "placehold.co", // Placeholder images
      },
      {
        protocol: "https",
        hostname: "www.google.com", // Allow Google images if needed (although not recommended)
      },
      {
        protocol: "https",
        hostname: "example.com", // Added for John Doe portfolio images
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Unsplash image CDN domain
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        child_process: false,
        fs: false,
        dns: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
