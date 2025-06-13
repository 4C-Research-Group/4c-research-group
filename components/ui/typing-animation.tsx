'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WordProps {
  text: string;
  className?: string;
  whileHover?: any;
}

interface TypingAnimationProps {
  words: WordProps[];
  speed?: number;
  className?: string;
  cursor?: boolean;
  cursorClassName?: string;
  delay?: number;
}

export function TypingAnimation({
  words,
  speed = 50,
  className = '',
  cursor = true,
  cursorClassName = 'inline-block w-[2px] h-6 bg-purple-600 animate-pulse ml-1',
  delay = 0,
}: TypingAnimationProps) {
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      if (currentWordIndex < words.length) {
        const currentWord = words[currentWordIndex].text;
        const currentDisplayedWord = displayedWords[currentWordIndex] || '';

        if (currentDisplayedWord.length < currentWord.length) {
          setDisplayedWords(prev => {
            const newWords = [...prev];
            newWords[currentWordIndex] = currentWord.slice(0, currentDisplayedWord.length + 1);
            return newWords;
          });
          timeoutId = setTimeout(type, speed);
        } else {
          setCurrentWordIndex(prev => prev + 1);
          timeoutId = setTimeout(type, speed);
        }
      } else {
        setIsTypingComplete(true);
      }
    };

    const startTyping = setTimeout(type, delay);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(startTyping);
    };
  }, [words, speed, delay, currentWordIndex, displayedWords]);

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className={word.className}
          whileHover={word.whileHover}
        >
          {displayedWords[index] || ''}
        </motion.span>
      ))}
      {cursor && !isTypingComplete && (
        <motion.span 
          className={cursorClassName}
          animate={{ opacity: [1, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 0.7, 
            ease: "easeInOut" 
          }}
        />
      )}
    </span>
  );
}
