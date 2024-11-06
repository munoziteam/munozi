import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const WritingText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index += 1;
      } else {
        clearInterval(interval);
      }
    }, 100); // speed of the typing effect

    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${className} text-2xl font-bold`}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="ml-1"
      >
        |
      </motion.span>
    </motion.div>
  );
};

export default WritingText;
