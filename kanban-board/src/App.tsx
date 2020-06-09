import { motion } from "framer-motion";
import React from "react";
import "./App.css";
import "./assets/main.css";

function App() {
  return (
    <motion.h1 className="text-indigo-100" animate={{ x: 50, y: 50 }}>
      Hello World
    </motion.h1>
  );
}

export default App;
