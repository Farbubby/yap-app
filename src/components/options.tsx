"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Options() {
  const [toggle, setToggle] = useState(false);

  const router = useRouter();

  const logout = async function (e: any) {
    e.preventDefault();

    const response = await fetch("/api/auth/logout", {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Logged out");
      router.push("/login");
    } else {
      console.error("Failed to log out");
    }
  };

  return (
    <>
      <div className="flex flex-col items-end">
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
          <div className="flex flex-col gap-4 fixed bg-gray-900 p-4 rounded-xl w-fit">
            <div className="flex flex-row gap-10 justify-end">
              <button onClick={() => setToggle(false)}>
                <svg
                  className="h-5 w-5 cursor-pointer fill-white"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center gap-4">
              <button onClick={logout}>Logout</button>
              <div>Settings</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
