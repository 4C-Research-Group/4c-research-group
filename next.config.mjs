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
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Unsplash image CDN domain
      },
      {
        protocol: "https",
        hostname: "www.istockphoto.com", // iStock photo images
      },
      {
        protocol: "https",
        hostname: "images.pexels.com", // Pexels images
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com", // Pixabay images
      },
      {
        protocol: "https",
        hostname: "img.freepik.com", // Freepik images
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com", // iStock media CDN
      },
      {
        protocol: "https",
        hostname: "st3.depositphotos.com", // Depositphotos
      },
      {
        protocol: "https",
        hostname: "st2.depositphotos.com", // Depositphotos
      },
      {
        protocol: "https",
        hostname: "st.depositphotos.com", // Depositphotos
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com", // Vecteezy
      },
      {
        protocol: "https",
        hostname: "www.shutterstock.com", // Shutterstock
      },
      {
        protocol: "https",
        hostname: "image.shutterstock.com", // Shutterstock CDN
      },
      {
        protocol: "https",
        hostname: "unsplash.com", // Unsplash website
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com", // Unsplash source CDN
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com", // Unsplash plus CDN
      },
    ],
  },
};

export default nextConfig;
