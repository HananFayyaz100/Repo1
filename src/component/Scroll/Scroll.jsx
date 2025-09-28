// ScrollToTop.js
import React, { useState, useEffect } from "react";
import "./Scroll.css";

const Scroll = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      setScrollProgress(progress);

      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button className="scroll-to-top" onClick={scrollToTop}>
        <svg className="progress-ring" width="50" height="50">
          <circle
            className="progress-ring__circle"
            stroke="#9747FF"
            strokeWidth="4"
            fill="transparent"
            r="22"
            cx="25"
            cy="25"
            style={{
              strokeDasharray: `${2 * Math.PI * 22}`,
              strokeDashoffset: `${
                2 * Math.PI * 22 - (scrollProgress / 100) * (2 * Math.PI * 22)
              }`,
              transition: "stroke-dashoffset 0.2s linear",
            }}
          />
        </svg>
        <span className="scroll-icon">⬆</span>
      </button>
    )
  );
};

export default Scroll;
