
import React, { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fade-in' | 'slide-in-right' | 'slide-in-left';
  delay?: number;
  className?: string;
}

const ScrollReveal = ({
  children,
  animation = 'fade-in',
  delay = 0,
  className = '',
}: ScrollRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (elementRef.current) {
                elementRef.current.classList.add(`animate-${animation}`);
                elementRef.current.style.opacity = '1';
              }
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [animation, delay]);

  return (
    <div
      ref={elementRef}
      className={`opacity-0 ${className}`}
      style={{ animationFillMode: 'forwards' }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
