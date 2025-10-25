import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
};

export const useHeroFadeProgress = () => {
  const [fadeProgress, setFadeProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      const careerSection = document.getElementById('career');
      
      if (!heroSection || !careerSection) return;

      const heroRect = heroSection.getBoundingClientRect();
      const careerRect = careerSection.getBoundingClientRect();
      
      // Start fading when career section comes into view
      const fadeStart = careerRect.top - window.innerHeight;
      const fadeEnd = careerRect.top;
      
      if (fadeStart <= 0 && fadeEnd >= 0) {
        const progress = Math.abs(fadeStart) / (fadeEnd - fadeStart);
        setFadeProgress(Math.min(progress, 1));
      } else if (fadeEnd < 0) {
        setFadeProgress(1); // Fully faded
      } else {
        setFadeProgress(0); // Not faded
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return fadeProgress;
};
