import React from "react";
import { motion } from "framer-motion";

// Helper function to split text into characters while preserving spaces
const splitText = (text) => {
  return text.split("").map((char, index) => (
    <motion.span
      key={index}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      style={{
        display: "inline-block",
        whiteSpace: "pre", // Preserves spaces
      }}
    >
      {char}
    </motion.span>
  ));
};

const AnimatedText = () => {
  const text = "Unlock A World Of Stories And Information";

  return (
    <div
      style={{
        fontSize: "3rem",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: "70px",
      }}
    >
      {splitText(text)}
    </div>
  );
};

export default AnimatedText;
