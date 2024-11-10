import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import OptimizedImage from '@/components/utils/OptimizedImage'
import ResearchLayout from "@/components/layout/ResearchLayout";
import MainQuestion from "./main-question";
import { getMDXContent } from "@/lib/api";


const SLIDES = [
  { Component: MainQuestion, path: "declaration/preamble.md" },
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

export default function Research({ slidesData }) {
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
    <ResearchLayout
      currentSlide={currentSlide}
      totalSlides={SLIDES.length}
      onNext={handleNext}
      onPrev={handlePrev}
      onPause={toggleAutoplay}
      isPlaying={isPlaying}
    >

      <div className="fixed inset-0 top-4 overflow-hidden">
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
    </ResearchLayout>
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
