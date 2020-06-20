import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import ProjectModal from "./ProjectModal";

interface Props {}

const ActionsSection: React.FC<Props> = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="flex justify-end">
      <button
        type="button"
        className="py-1 px-4 text-sm text-white bg-green-600 rounded"
        onClick={() => setModalIsOpen(true)}
      >
        New Project
      </button>
      <AnimatePresence>
        {modalIsOpen && <ProjectModal setModalIsOpen={setModalIsOpen} />}
      </AnimatePresence>
    </div>
  );
};

export default ActionsSection;
