import Modal from "@/components/Modal";
import { useState } from "react";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div>Home Page</div>
      <button
        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700 transition"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Simple Modal">
        <p className="mb-4">
          This is a basic modal. More features coming soon!
        </p>
      </Modal>
    </div>
  );
}
