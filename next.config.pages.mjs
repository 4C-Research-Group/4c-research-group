/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/4c-research-lab",
  assetPrefix: "/4c-research-lab/",
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "rlefnhfbszcuuhvupvme.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  // Disable trailing slash for GitHub Pages compatibility
  trailingSlash: false,
};

export default nextConfig;
