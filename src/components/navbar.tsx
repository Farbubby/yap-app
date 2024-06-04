"use client";

import Options from "./options";
import Profile from "./profile";

export default function Navbar() {
  return (
    <>
      <div className="flex flex-row py-4 px-10 items-center justify-between">
        <Profile />
        <Options />
      </div>
    </>
  );
}
