"use client";

import { useState } from "react";
import { logout } from "@/auth/logout";

export default function Options() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center">
        <button onClick={() => setToggle(!toggle)}>
          <svg
            className="h-8 w-8 cursor-pointer fill-white"
            clip-rule="evenodd"
            fill-rule="evenodd"
            stroke-linejoin="round"
            stroke-miterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="m11.998 2c5.517 0 9.997 4.48 9.997 9.998 0 5.517-4.48 9.997-9.997 9.997-5.518 0-9.998-4.48-9.998-9.997 0-5.518 4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.497 8.498 8.497 8.497-3.807 8.497-8.497-3.807-8.498-8.497-8.498zm2.502 8.495c0-.69.56-1.25 1.25-1.25s1.25.56 1.25 1.25-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25zm-3.75 0c0-.69.56-1.25 1.25-1.25s1.25.56 1.25 1.25-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25zm-3.75 0c0-.69.56-1.25 1.25-1.25s1.25.56 1.25 1.25-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25z" />
          </svg>
        </button>
        {toggle && (
          <div className="flex flex-col gap-4 fixed bg-gray-900 p-4 text-center rounded-xl">
            <button onClick={() => setToggle(false)}>X</button>
            <form action={logout}>
              <button>Logout</button>
            </form>
            <div>Settings</div>
          </div>
        )}
      </div>
    </>
  );
}
