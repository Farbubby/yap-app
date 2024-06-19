"use client";

import { useRouter } from "next/navigation";
import Profile from "./profile";

export default function Options() {
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
      <div className="relative h-10">
        <input
          type="checkbox"
          className="peer top-0 left-0 absolute w-full h-10 opacity-0 z-20 cursor-pointer"
        />
        <div className="bg-gray-900 px-4 py-2 rounded-lg peer-checked:rounded-b-none duration-1000 border h-10">
          Options
        </div>
        <svg
          className="w-8 h-8 text-gray-100 absolute top-0 right-0 mx-2 my-1 z-10 fill-white peer-checked:rotate-180 duration-500"
          clip-rule="evenodd"
          fill-rule="evenodd"
          stroke-linejoin="round"
          stroke-miterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z" />
        </svg>
        <div className="bg-gray-900 rounded-b-lg max-h-0 overflow-hidden peer-checked:max-h-40 duration-500">
          <div className="flex flex-col border-b">
            <button
              onClick={logout}
              className="hover:bg-gray-950 duration-200 px-4 py-2">
              Logout
            </button>
            <button className="hover:bg-gray-950 duration-200 px-4 py-2">
              Settings
            </button>
          </div>
          <Profile />
        </div>
      </div>
    </>
  );
}
