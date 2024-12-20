import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import OptimizedImage from '@/components/utils/OptimizedImage'
import DeclarationLayout from "@/components/layout/DeclarationLayout";
import Ownership from "./ownership";
import Preamble from "./preamble";
import Privacy from "./privacy";
import Security from "./security";
import AccessRight from "./access-right";
import { getMDXContent } from "@/lib/api";

const SLIDES = [
  { Component: Preamble, path: "declaration/preamble.md" },
  { Component: Ownership, path: "declaration/ownership.md" },
  { Component: Privacy, path: "declaration/privacy.md" },
  { Component: Security, path: "declaration/security.md" },
  { Component: AccessRight, path: "declaration/access-right.md" },
];

const slideVariants = {
  enterFromRight: {
    x: "100%",
    filter: "blur(8px)",
    opacity: 0,
  },
  enterFromLeft: {
    x: "-100%",
    filter: "blur(8px)",
    opacity: 0,
  },
  center: {
    x: 0,
    filter: "blur(0px)",
    opacity: 1,
    transition: {
      x: { duration: 0.3, ease: "easeOut" },
      filter: { duration: 0.5, delay: 0.2 },
      opacity: { duration: 0.3 },
    },
  },
  exitToLeft: {
    x: "-100%",
    filter: "blur(8px)",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
  exitToRight: {
    x: "100%",
    filter: "blur(8px)",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

export default function Declaration({ slidesData }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); 
  const autoplayRef = useRef(null);

  const AUTOPLAY_DELAY = 15000; // 15 seconds per slide

  const handleNext = useCallback(() => {
    if (currentSlide < SLIDES.length - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    } else {
      // Loop back to first slide
      setDirection(1);
      setCurrentSlide(0);
    }
  }, [currentSlide]);

  const handlePrev = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const toggleAutoplay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Get current slide data
  const { Component } = SLIDES[currentSlide];
  const { source, frontmatter } = slidesData?.[currentSlide] || {};

  // Autoplay effect
  useEffect(() => {
    if (isPlaying) {
      autoplayRef.current = setInterval(handleNext, AUTOPLAY_DELAY);
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isPlaying, handleNext]);

  return (
    <DeclarationLayout
      currentSlide={currentSlide}
      totalSlides={SLIDES.length}
      onNext={handleNext}
      onPrev={handlePrev}
      onPause={toggleAutoplay}
      isPlaying={isPlaying}
    >
      {/* Background Image with Gradient Overlay */}
      <div className="fixed inset-0 -z-10 h-screen mt-20">
        <OptimizedImage
          src="/images/declaration.jpg"
          alt="Declaration Background"
          fill
          className="object-cover object-center"
          priority
          quality={100}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/70 via-neutral-900/50 to-neutral-900/70" />
      </div>

      <div className="fixed inset-0 top-16 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={direction > 0 ? "enterFromRight" : "enterFromLeft"}
            animate="center"
            exit={direction > 0 ? "exitToLeft" : "exitToRight"}
            variants={slideVariants}
            className="absolute inset-0"
          >
            <Component source={source} frontmatter={frontmatter} />
          </motion.div>
        </AnimatePresence>
      </div>
    </DeclarationLayout>
  );
}

export async function getStaticProps() {
  try {
    // Load all slide content
    const slidesData = await Promise.all(
      SLIDES.map(async ({ path }) => {
        const data = await getMDXContent(path);
        console.log(`Loaded data for ${path}:`, data);
        return data;
      })
    );

    return {
      props: {
        slidesData,
      },
    };
  } catch (error) {
    console.error("Error loading slides:", error);
    return {
      props: {
        slidesData: [],
      },
    };
  }
}
