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
      return false;
    }

    // Check if it's a valid URL
    try {
      new URL(url);
    } catch {
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

    return hasImageExtension || isFromImageDomain;
  };

  if (imageError || !src || !isValidImageUrl(src)) {
    return (
      <div
        className={`flex items-center justify-center w-full h-full bg-gradient-to-br from-cognition-600 to-cognition-800 ${className}`}
      >
        {/* No initials or text, just background */}
      </div>
    );
  }
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
        setImageError(true);
      }}
      onLoad={() => {
        // Image loaded successfully
      }}
    />
  );
}
