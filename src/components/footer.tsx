"use client";

import CreatePostButton from "./create-post-button";

export default function Footer() {
  return (
    <>
      <div className="flex flex-row justify-end items-center py-8 px-10 fixed w-ful right-0 bottom-0">
        <CreatePostButton />
      </div>
    </>
  );
}
