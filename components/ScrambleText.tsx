import React, { useEffect, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/';

interface ScrambleTextProps {
  text: string;
  delay?: number;
  className?: string;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({ text, delay = 0, className }) => {
  const [output, setOutput] = useState('');
  const [started, setStarted] = useState(false);
  // Reserve space by defaulting to invisible text or keeping height
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
      setOpacity(1);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setOutput(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '; // Preserve spaces
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3; // Adjust speed of decoding here
    }, 30);

    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span 
      className={`inline-block ${className}`} 
      style={{ opacity: opacity, transition: 'opacity 0.2s' }}
    >
      {output || text.replace(/./g, ' ')} {/* Maintain width before starting */}
    </span>
  );
};

export default ScrambleText;