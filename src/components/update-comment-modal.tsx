"use client";

import { useState, useContext, useEffect } from "react";
import { UserContext } from "@/context/user-context";

interface UpdateCommentModalProps {
  commentId: string;
  close: () => void;
}

// Modal form for updating a comment
export default function UpdateCommentModal({
  commentId,
  close,
}: UpdateCommentModalProps) {
  const [animateState, setAnimateState] = useState("animate-fadeInUp");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const user = useContext(UserContext);

  const handleUpdateComment = async (e: any) => {
    if (!user) {
      setError("Please log in to update your posts");
      e.preventDefault();
      return;
    }

    if (!content) {
      e.preventDefault();
      setAnimateState("animate-fadeOutDown");
      setTimeout(() => close(), 500);
      return;
    }

    const response = await fetch("/api/comments", {
      method: "PUT",
      body: JSON.stringify({
        commentId,
        content,
      }),
    });

    if (response.ok) {
      const { comment, message } = await response.json();
      console.log(comment, message);
      setError("");
    } else {
      console.error("Failed to update comment");
      setError("Failed to update comment");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
  });

  return (
    <>
      <div className="fixed inset-0 flex flex-row w-full h-full backdrop-blur-md justify-center items-center z-50">
        <div
          className={`border border-gray-700 p-6 rounded-lg flex flex-col gap-8 xl:w-2/5 lg:w-1/2 md:w-2/3 sm:w-3/4 w-4/5 bg-gray-950 ${animateState}`}>
          <div className="sm:text-sm text-xs text-center flex flex-col gap-2">
            <div className="w-full flex flex-row-reverse">
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
            </div>
            <div>Update this comment</div>
          </div>
          <form onSubmit={handleUpdateComment} className="flex flex-col gap-3">
            <label className="text-xs">Comment here</label>
            <textarea
              rows={10}
              cols={10}
              placeholder="Content"
              className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
              onChange={(e) => setContent(e.target.value)}
            />
            <input
              type="submit"
              value={"Submit"}
              className="rounded-lg bg-gray-900 text-white py-1 hover:bg-gray-800 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
}