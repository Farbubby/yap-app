"use client";

import { useState } from "react";
import OpenCommentsModal from "./open-comments-modal";

export default function OpenCommentsButton() {
  const [toggleOpenCommentsModal, setToggleOpenCommentsModal] = useState(false);
  return (
    <>
      <button onClick={() => setToggleOpenCommentsModal(true)}>
        <svg
          className="fill-white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24">
          <path d="M21.414 18.586l2.586-2.586v8h-8l2.586-2.586-5.172-5.172 2.828-2.828 5.172 5.172zm-13.656-8l2.828-2.828-5.172-5.172 2.586-2.586h-8v8l2.586-2.586 5.172 5.172zm10.828-8l-2.586-2.586h8v8l-2.586-2.586-5.172 5.172-2.828-2.828 5.172-5.172zm-8 13.656l-2.828-2.828-5.172 5.172-2.586-2.586v8h8l-2.586-2.586 5.172-5.172z" />
        </svg>
      </button>
      {toggleOpenCommentsModal && (
        <OpenCommentsModal close={() => setToggleOpenCommentsModal(false)} />
      )}
    </>
  );
}
