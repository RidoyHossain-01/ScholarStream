import { motion, AnimatePresence } from "framer-motion";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import useTheme from "../../../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark/light mode"
      className={`relative w-14 h-7 rounded-full border-2 cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
        ${isDark ? "bg-primary border-accent/60" : "bg-base-200 border-base-300"}`}
    >
      {/* Sliding thumb */}
      <motion.div
        layout
        animate={{ x: isDark ? 28 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute top-0.5 w-5 h-5 rounded-full flex items-center justify-center shadow-md
          ${isDark ? "bg-accent" : "bg-primary"}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <BsMoonStarsFill className="text-white text-[10px]" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <BsSun className="text-white text-[10px]" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
