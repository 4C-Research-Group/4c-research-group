"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselClientProps {
  images: string[];
  height?: string;
  className?: string;
  showNavigation?: boolean;
  manualNavigation?: boolean;
}

export default function CarouselClient({
  images,
  height = "h-screen",
  className = "",
  showNavigation = false,
  manualNavigation = false,
}: CarouselClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const [isHoveringPrev, setIsHoveringPrev] = useState(false);
  const [isHoveringNext, setIsHoveringNext] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prevIndex) => {
        if (newDirection > 0) {
          return (prevIndex + 1) % images.length;
        } else {
          return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
        }
      });
    },
    [images.length]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 6000); // Auto-slide every 6 seconds

    return () => clearInterval(interval);
  }, [paginate]);

  return (
    <div className={`relative w-full ${height} overflow-hidden ${className}`}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation Dots */}
      {showNavigation && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const direction = index > currentIndex ? 1 : -1;
                paginate(direction);
                setCurrentIndex(index);
              }}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${
                  index === currentIndex
                    ? "bg-primary scale-125"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-primary/50"
                }
              `}
            />
          ))}
        </div>
      )}

      {/* Manual Navigation Arrows */}
      {manualNavigation && (
        <div className="absolute inset-0 z-20 pointer-events-none hidden md:block">
          <div
            className={`absolute left-0 top-0 bottom-0 w-1/4 flex items-center justify-start 
            transition-all duration-300 ease-in-out 
            ${isHoveringPrev ? "bg-black/10" : "bg-transparent"}`}
            onMouseEnter={() => setIsHoveringPrev(true)}
            onMouseLeave={() => setIsHoveringPrev(false)}
          >
            <button
              aria-label="Previous slide"
              disabled={images.length <= 1}
              className={`ml-4 p-3 rounded-full 
              transition-all duration-300 ease-in-out 
              pointer-events-auto 
              ${
                isHoveringPrev
                  ? "bg-white/80 shadow-lg scale-110 text-blue-600"
                  : "bg-white/50 text-gray-800"
              }
              ${images.length <= 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-white/80"}
              focus:outline-none focus:ring-2 focus:ring-blue-500`}
              onClick={() => paginate(-1)}
            >
              <FaChevronLeft className="h-6 w-6" />
            </button>
          </div>

          <div
            className={`absolute right-0 top-0 bottom-0 w-1/4 flex items-center justify-end 
            transition-all duration-300 ease-in-out 
            ${isHoveringNext ? "bg-black/10" : "bg-transparent"}`}
            onMouseEnter={() => setIsHoveringNext(true)}
            onMouseLeave={() => setIsHoveringNext(false)}
          >
            <button
              aria-label="Next slide"
              disabled={images.length <= 1}
              className={`mr-4 p-3 rounded-full 
              transition-all duration-300 ease-in-out 
              pointer-events-auto 
              ${
                isHoveringNext
                  ? "bg-white/80 shadow-lg scale-110 text-blue-600"
                  : "bg-white/50 text-gray-800"
              }
              ${images.length <= 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-white/80"}
              focus:outline-none focus:ring-2 focus:ring-blue-500`}
              onClick={() => paginate(1)}
            >
              <FaChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
