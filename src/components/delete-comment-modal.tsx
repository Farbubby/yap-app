"use client";

import { useState, useContext, useEffect } from "react";
import { UserContext } from "@/context/user-context";

interface DeleteCommentModalProps {
  commentId: string;
  close: () => void;
}

// Modal form for deleting a post
export default function DeleteCommentModal({
  commentId,
  close,
}: DeleteCommentModalProps) {
  const [animateState, setAnimateState] = useState("animate-fadeInUp");
  const [error, setError] = useState("");

  const user = useContext(UserContext);

  const handleDeleteComment = async (e: any) => {
    if (!user) {
      setError("Please log in to delete your comments");
      e.preventDefault();
      return;
    }

    const response = await fetch("/api/comments", {
      method: "DELETE",
      body: JSON.stringify({ commentId }),
    });

    if (response.ok) {
      const { comment, message } = await response.json();
      console.log(comment, message);
      setError("");
      window.location.reload();
    } else {
      console.error("Failed to delete comment");
      setError("Failed to delete comment");
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
          <div className="text-sm text-center">
            Are you sure you want to delete this comment?
          </div>
          <div className="sm:text-sm text-xs text-center flex flex-row gap-20 justify-center">
            <button
              className="rounded-lg p-2 bg-green-700 w-20 hover:bg-green-500"
              onClick={handleDeleteComment}>
              Yes
            </button>
            <button
              className="rounded-lg p-2 bg-red-700 w-20 hover:bg-red-500"
              onClick={() => {
                setAnimateState("animate-fadeOutDown");
                setTimeout(() => close(), 500);
              }}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
