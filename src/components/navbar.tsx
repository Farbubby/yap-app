"use client";

import Options from "./options";
import LinkButton from "./link-button";
import Profile from "./profile";
import { UserContext } from "@/context/user-context";
import { useContext } from "react";

export default function Navbar() {
  const user = useContext(UserContext);
  return (
    <>
      <div className="flex flex-row justify-between items-center py-4 px-10 fixed w-full backdrop-blur-sm gap-8 h-20 border-b border-gray-600">
        <Profile alias={user.alias} username={user.username} />
        <div className="flex flex-row gap-8 items-center">
          <LinkButton label="Home" href="/home" />
          <LinkButton label="Messages" href="/message" />
          <Options />
        </div>
      </div>
    </>
  );
}
