'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

interface AutoplayCarouselProps {
  children: React.ReactNode;
  delay?: number;
  pauseOnHover?: boolean;
  className?: string;
  renderDots?: (props: {
    currentSlide: number;
    totalSlides: number;
    onDotClick: (index: number) => void;
  }) => React.ReactNode;
}

export function AutoplayCarousel({
  children,
  delay = 5000,
  pauseOnHover = true,
  className,
  renderDots,
}: AutoplayCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [isHovered, setIsHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  const scrollNext = useCallback(() => {
    if (api) {
      api.scrollNext();
    }
  }, [api]);

  const scrollToSlide = useCallback((index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    const onResize = () => {
      setTotalSlides(api.scrollSnapList().length);
    };

    api.on("select", onSelect);
    api.on("reInit", onResize);
    onSelect();
    onResize();

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onResize);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;

    let intervalId: NodeJS.Timeout;

    if (!isHovered) {
      intervalId = setInterval(() => {
        scrollNext();
      }, delay);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [api, delay, isHovered, scrollNext]);

  const defaultRenderDots = () => (
    <div className="flex items-center justify-center space-x-2 mt-4">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => scrollToSlide(index)}
          className={`
            w-3 h-3 rounded-full transition-all duration-300
            ${index === currentSlide 
              ? 'bg-purple-600 dark:bg-purple-400 w-4 h-4' 
              : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }
          `}
        />
      ))}
    </div>
  );

  return (
    <div 
      onMouseEnter={pauseOnHover ? () => setIsHovered(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setIsHovered(false) : undefined}
    >
      <Carousel 
        setApi={setApi} 
        className={className}
        opts={{
          loop: true,
        }}
      >
        {children}
      </Carousel>
      
      {renderDots 
        ? renderDots({ currentSlide, totalSlides, onDotClick: scrollToSlide })
        : defaultRenderDots()}
    </div>
  );
}
