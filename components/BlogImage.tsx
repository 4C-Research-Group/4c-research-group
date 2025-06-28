"use client";

import Image from "next/image";
import { useState } from "react";

interface BlogImageProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}

export default function BlogImage({
  src,
  alt,
  title,
  className = "",
  priority = false,
  fill = false,
  width,
  height,
}: BlogImageProps) {
  const [imageError, setImageError] = useState(false);

  // Check if the URL is valid and likely to be an image
  const isValidImageUrl = (url: string) => {
    if (!url) {
      console.log("BlogImage: No URL provided");
      return false;
    }

    // Check if it's a valid URL
    try {
      new URL(url);
    } catch {
      console.log("BlogImage: Invalid URL format:", url);
      return false;
    }

    // Check if it's likely an image URL (has image extension or is from known image CDNs)
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    const imageDomains = [
      "images.unsplash.com",
      "source.unsplash.com",
      "plus.unsplash.com",
      "images.pexels.com",
      "cdn.pixabay.com",
      "img.freepik.com",
      "placehold.co",
      "lh3.googleusercontent.com",
    ];

    const urlLower = url.toLowerCase();
    const hasImageExtension = imageExtensions.some((ext) =>
      urlLower.includes(ext)
    );
    const isFromImageDomain = imageDomains.some((domain) =>
      urlLower.includes(domain)
    );

    console.log("BlogImage Debug:", {
      url,
      hasImageExtension,
      isFromImageDomain,
      isValid: hasImageExtension || isFromImageDomain,
    });

    return hasImageExtension || isFromImageDomain;
  };

  const placeholderImage =
    "https://placehold.co/800x400/cccccc/666666?text=Blog+Post";

  if (imageError || !src || !isValidImageUrl(src)) {
    console.log("BlogImage: Showing fallback for:", { src, imageError, title });
    const initials = title
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 3);

    return (
      <div
        className={`flex items-center justify-center w-full h-full bg-gradient-to-br from-cognition-600 to-cognition-800 text-white font-bold ${className}`}
      >
        <span className="text-4xl md:text-6xl">{initials}</span>
      </div>
    );
  }

  console.log("BlogImage: Attempting to load:", src);
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      priority={priority}
      fill={fill}
      width={width}
      height={height}
      onError={(e) => {
        console.log("BlogImage: Error loading image:", src, e);
        setImageError(true);
      }}
      onLoad={() => {
        console.log("BlogImage: Successfully loaded:", src);
      }}
    />
  );
}
