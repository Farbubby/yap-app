"use client";

import { useState } from "react";
import UpdateCommentForm from "./form/update-comment-form";
import Modal from "./modal";

export default function UpdateCommentButton() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <button>
        <svg
          onClick={() => setToggle(true)}
          className="h-5 w-5 cursor-pointer fill-white"
          clip-rule="evenodd"
          fill-rule="evenodd"
          stroke-linejoin="round"
          stroke-miterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z"
            fill-rule="nonzero"
          />
        </svg>
      </button>
      {toggle && (
        <Modal close={() => setToggle(false)}>
          <UpdateCommentForm />
        </Modal>
      )}
    </>
  );
}
