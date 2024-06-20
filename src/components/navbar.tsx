"use client";

import Options from "./options";
import LinkButton from "./link-button";

export default function Navbar() {
  return (
    <>
      <div className="flex flex-row justify-end items-center py-4 px-10 fixed w-full backdrop-blur-sm gap-8">
        <LinkButton label="Home" href="/home" />
        <LinkButton label="Messages" href="/message" />
        <Options />
      </div>
    </>
  );
}
