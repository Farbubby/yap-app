"use client";

import Options from "./options";

export default function Navbar() {
  return (
    <>
      <div className="flex flex-row-reverse justify-between items-center py-4 px-10 fixed w-full backdrop-blur-sm">
        <Options />
      </div>
    </>
  );
}
