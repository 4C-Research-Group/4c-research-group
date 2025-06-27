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
        hostname: "via.placeholder.com", // Placeholder images
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
        hostname: "images.unsplash.com", // Added for banner images
      },
    ],
  },
};

export default nextConfig;
