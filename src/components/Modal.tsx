import { FocusTrap } from "focus-trap-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Add event listener on component mount to listen for Escape key
    document.addEventListener("keydown", handleEsc);

    // Cleanup: remove the listener when the component unmounts
    // or when onClose changes, to prevent memory leaks or duplicates
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
        {/* prevents from leaving focus of the modal
            fallbackFocus: focus on id="modal"
        */}
        <FocusTrap
          focusTrapOptions={{
            fallbackFocus: "#modal",
            escapeDeactivates: false,
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
            role="dialog"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={onClose}
              aria-label="Close Modal"
            >
              &times;
            </button>
            <h2 id="modal-title" className="text-xl font-semibold mb-4">
              {title}
            </h2>
            <div>{children}</div>
          </motion.div>
        </FocusTrap>
      </div>
    </AnimatePresence>,
    document.body
  );
}
