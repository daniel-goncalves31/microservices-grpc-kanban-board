import { motion } from "framer-motion";
import React from "react";

interface Props {
  title: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const Modal: React.FC<Props> = ({ title, children, onCancel, onSubmit }) => {
  return (
    <motion.form
      onSubmit={onSubmit}
      className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10"
      style={{ backgroundColor: "rgba(113, 128, 150, 0.25)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: "-30%", opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.4 }}
        exit={{ y: "-100%", opacity: 0 }}
        className="w-1/3 p-4 bg-white rounded shadow-lg"
      >
        <h2 className="text-center text-3xl font-semibold text-gray-900">
          {title}
        </h2>
        <hr className="my-4" />
        <div>{children}</div>
        <hr className="my-4" />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="px-4 py-1 rounded bg-gray-200 text-gray-700"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1 rounded bg-green-500 text-gray-200"
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.form>
  );
};

export default Modal;
