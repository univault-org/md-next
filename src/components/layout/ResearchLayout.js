import Link from "next/link";
import { motion } from "framer-motion";

export default function ResearchLayout({
  children,
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onPause,
  isPlaying,
}) {
  const sections = [
    { name: "Key Questions", href: "./key-question" },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-neutral-900/80 shadow-sm backdrop-blur-md z-40 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex space-x-8">
              {sections.map((section) => (
                <Link
                  key={section.name}
                  href={section.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-neutral-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {section.name}
                </Link>
              ))}
            </div>

            {/* Slide indicators */}
            <div className="flex gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentSlide
                      ? "bg-primary-500"
                      : "bg-neutral-300 dark:bg-neutral-600"
                  }`}
                  initial={false}
                  animate={{
                    scale: index === currentSlide ? 1.2 : 1,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </nav>
      {/* Main content - Simplified structure */}
      <main className="relative min-h-screen overflow-y-auto -z-10">
        <motion.div
          className="min-h-screen flex items-center justify-center pt-16" // Changed -mt-24 to pt-16
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{
            opacity: 1,
            y: -96,
            filter: "blur(0px)",
          }}
          transition={{
            opacity: { duration: 0.2 },
            y: { duration: 0.3 },
            filter: { duration: 0.5, delay: 0.1 },
          }}
        >
          {children}
        </motion.div>

        {/* Slide Navigation Buttons */}
        {false && (
          <div className="fixed bottom-8 left-0 right-0 z-50">
            <div className="max-w-xl mx-auto px-4 flex justify-center items-center gap-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentSlide === 0}
                onClick={onPrev}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 
                text-white/80 flex items-center justify-center hover:bg-white/20 transition-colors
                font-bold tracking-tighter text-xl"
              >
                ≪𝗥
              </motion.button>

              <motion.button
                onClick={onPause}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 rounded-full backdrop-blur-sm border transition-all duration-300
                ${
                  isPlaying
                    ? "bg-primary-500/30 border-primary-400 text-primary-200 hover:bg-primary-500/40"
                    : "bg-white/10 border-white/20 text-white/80 hover:bg-white/20"
                }
                flex items-center justify-center font-bold text-xl`}
              >
                <span
                  className={`inline-flex items-center justify-center 
                ${
                  isPlaying
                    ? "" // Adjust for pause symbol
                    : "ml-0.5 -mt-0.5" // Adjust for play symbol
                }`}
                >
                  {isPlaying ? "❚❚" : "▶"}
                </span>
              </motion.button>

              <motion.button
                onClick={onNext}
                disabled={currentSlide === totalSlides - 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 
                text-white/80 flex items-center justify-center hover:bg-white/20 transition-colors
                font-bold tracking-tighter text-xl"
              >
                𝗙
                <span className="rotate-180 inline-block -ml-[0.45rem] mt-[0.25rem]">
                  ≪
                </span>
              </motion.button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
