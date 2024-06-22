"use client";

import { useState, useEffect, useContext } from "react";
import { UserContext, PostContext } from "@/context/user-context";
import Comment from "./comment";

interface OpenCommentsModalProps {
  close: () => void;
}

export default function OpenCommentsModal({ close }: OpenCommentsModalProps) {
  const [animateState, setAnimateState] = useState("animate-fadeInUp");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const post = useContext(PostContext);
  const user = useContext(UserContext);

  const commentsList = comments.map((comment: any, index: number) => {
    if (index === comments.length - 1) {
      return (
        <Comment
          key={comment.id}
          id={comment.id}
          content={comment.content}
          author={comment.authorId}
          date={comment.createdAt}
          numLikes={comment.likes}
          numDislikes={comment.dislikes}
        />
      );
    }
    return (
      <div key={comment.id} className="border-b">
        <Comment
          key={comment.id}
          id={comment.id}
          content={comment.content}
          author={comment.authorId}
          date={comment.createdAt}
          numLikes={comment.likes}
          numDislikes={comment.dislikes}
        />
      </div>
    );
  });

  const handleCreateComment = async (e: any) => {
    if (!user || !post) {
      console.error("User or post not found");
      e.preventDefault();
      return;
    }

    if (!comment) {
      console.error("Please fill in all fields");
      e.preventDefault();
      return;
    }

    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        content: comment,
        authorId: user.id,
        postId: post.id,
      }),
    });

    if (response.ok) {
      const { comment, message } = await response.json();
      console.log(comment, message);
    } else {
      console.error("Failed to create comment");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const fetchComments = async () => {
      const res = await fetch(`/api/comments?postId=${post?.id}`);
      const data = await res.json();
      console.log(data);
      setComments(data.comments);
    };
    fetchComments();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [post]);

  return (
    <>
      <div className="fixed inset-0 flex flex-row w-full h-full backdrop-blur-md justify-center items-center z-50">
        <div
          className={`border border-gray-700 p-6 rounded-lg flex flex-col gap-8 xl:w-2/5 lg:w-1/2 md:w-2/3 sm:w-3/4 w-4/5 bg-gray-950 ${animateState}`}>
          <button
            className="flex flex-row-reverse w-full"
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
          <div className="flex flex-col overflow-y-scroll h-96">
            {commentsList}
          </div>
          <form
            onSubmit={handleCreateComment}
            className="flex flex-row gap-4 justify-center">
            <input
              type="text"
              placeholder="Add a comment"
              className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
              onChange={(e) => setComment(e.target.value)}
            />
            <input
              type="submit"
              value={"Comment"}
              className="rounded-lg bg-gray-900 text-white py-1 hover:bg-gray-800 cursor-pointer p-2"
            />
          </form>
        </div>
      </div>
    </>
  );
}
