"use client";

import { useState } from "react";
import CreatePostForm from "./form/create-post-form";
import Modal from "./modal";

export default function CreatePostButton() {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <button onClick={() => setToggle(true)}>
        <svg
          className="fill-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-5 17l1.006-4.036 3.106 3.105-4.112.931zm5.16-1.879l-3.202-3.202 5.841-5.919 3.201 3.2-5.84 5.921z" />
        </svg>
      </button>
      {toggle && (
        <Modal close={() => setToggle(false)}>
          <CreatePostForm />
        </Modal>
      )}
    </>
  );
}
