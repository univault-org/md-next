import { MDXRemote } from "next-mdx-remote";
import { motion } from "framer-motion";

export default function Ownership({ source, frontmatter }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-16 sm:pt-20 pb-12 px-2 sm:px-4 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-sm bg-white/5 dark:bg-black/5 rounded-lg border border-white/20 dark:border-white/10 shadow-2xl"
        >
          {/* Header Section */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="py-6 sm:py-10 px-4 sm:px-8 border-b border-white/20 dark:border-white/10 flex items-center justify-center"
          >
            <h1 className="text-[2rem] sm:text-[3rem] md:text-[4.5rem] text-center text-white/90 dark:text-white/80 leading-tight font-serif">
              We The Universal Citizens
            </h1>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="px-4 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16"
          >
            <div className="prose prose-lg sm:prose-xl md:prose-2xl max-w-3xl mx-auto">
              <div className="text-white/90 dark:text-white/80 text-3xl sm:text-4xl md:text-5xl leading-relaxed font-serif">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 font-serif">
                  Article 2: Ownership
                </h2>
                <p className="first-letter:text-[4.5rem] sm:first-letter:text-[5.5rem] md:first-letter:text-[6.5rem] 
                   first-letter:font-bold first-letter:float-left first-letter:-mt-3 
                   sm:first-letter:-mt-4 md:first-letter:-mt-6 first-letter:leading-[0.8] 
                   text-xl sm:text-3xl md:text-4xl
                   leading-relaxed tracking-wide">
                  Owning personal data means having the right to fully control
                  it, much like control over one's own body. There is the right
                  to retain it, use it as desired, share it, or even delete it
                  if so chosen. Personal data can be passed on to others and its
                  value can be utilized. In essence, this data belongs to the
                  individual to manage, protect, and decide how it is used.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center py-4 sm:py-6 border-t border-white/20 dark:border-white/10"
          >
            <div className="flex flex-col items-center">
              <p className="text-white/60 dark:text-white/50 text-xs sm:text-sm font-serif">
                Univault.org - Preserving Digital Sovereignty
              </p>
            </div>
          </motion.footer>
        </motion.div>
      </div>
    </motion.div>
  );
}
