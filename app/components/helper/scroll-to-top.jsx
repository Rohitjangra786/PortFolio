"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 p-[1px] shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none ${isVisible ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-10"
        }`}
      onClick={scrollToTop}
    >
      <span className="flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#0d1224] text-xl text-white transition-all duration-200 hover:bg-transparent">
        <FaArrowUp />
      </span>
    </button>
  );
};

export default ScrollToTop;
