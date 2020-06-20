import { motion, Variants } from "framer-motion";
import React from "react";
import ActionsSection from "./header/ActionsSection";
import Navbar from "./header/Navbar";

interface Props {}

const opacityVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
  },
};

const Home: React.FC<Props> = () => {
  return (
    <motion.div
      variants={opacityVariant}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Navbar />
      <div className="p-4">
        <ActionsSection />
      </div>
    </motion.div>
  );
};

export default Home;
