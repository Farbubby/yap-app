"use client";

import { useContext } from "react";
import { UserContext } from "@/context/context";

export default function Profile() {
  const user = useContext(UserContext);
  return (
    <>
      <div className="flex flex-col items-center p-2">
        <div className="text-xs">Logged in as</div>
        <div className="flex flex-row gap-4 items-center px-4 py-2 rounded-lg">
          <svg
            className="fill-white"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" />
          </svg>
          <div className="flex flex-col text-sm">
            <div>{user.alias}</div>
            <div>{user.username}</div>
          </div>
        </div>
      </div>
    </>
  );
}
