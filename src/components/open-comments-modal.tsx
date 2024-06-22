"use client";

import { useState, useEffect, useContext } from "react";
import { PostContext } from "@/context/user-context";
import Post from "./post";

interface OpenCommentsModalProps {
  close: () => void;
}

export default function OpenCommentsModal({ close }: OpenCommentsModalProps) {
  const [animateState, setAnimateState] = useState("animate-fadeInUp");
  const { id, title, author, content, date, numLikes, numDislikes } =
    useContext(PostContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  });
  return (
    <>
      <div className="fixed inset-0 flex flex-row w-full h-full backdrop-blur-md justify-center items-center z-50">
        <div
          className={`border border-gray-700 p-6 rounded-lg flex flex-col gap-8 xl:w-2/5 lg:w-1/2 md:w-2/3 sm:w-3/4 w-4/5 bg-gray-950 ${animateState}`}>
          <button
            onClick={() => {
              setAnimateState("animate-fadeOutDown");
              setTimeout(() => close(), 500);
            }}>
            <svg
              className="h-6 w-6 cursor-pointer fill-white"
              clip-rule="evenodd"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
            </svg>
          </button>
          <div>Hi</div>
        </div>
      </div>
    </>
  );
}
