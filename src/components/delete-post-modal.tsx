"use client";

import { useState, useContext, useEffect } from "react";
import { handleDeletePost } from "@/server/post/delete-post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostContext } from "@/context/user-context";

interface DeletePostModalProps {
  close: () => void;
}

// Modal form for deleting a post
export default function DeletePostModal({ close }: DeletePostModalProps) {
  const [animateState, setAnimateState] = useState("animate-fadeInUp");
  const queryClient = useQueryClient();

  const selectedPost = useContext(PostContext);

  const mutation = useMutation({
    mutationFn: () => handleDeletePost(selectedPost.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

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
          <div className="text-sm text-center">
            Are you sure you want to delete the post?
          </div>
          <div className="sm:text-sm text-xs text-center flex flex-row gap-20 justify-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setAnimateState("animate-fadeOutDown");
                setTimeout(() => close(), 500);
                mutation.mutate();
              }}>
              <button className="rounded-lg p-2 bg-green-700 w-20 hover:bg-green-500">
                Yes
              </button>
            </form>
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
