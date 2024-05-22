"use client";

import Options from "./options";

export default function Navbar() {
  return (
    <>
      <div className="flex flex-row-reverse py-4 px-20 items-center">
        <Options />
      </div>
    </>
  );
}
