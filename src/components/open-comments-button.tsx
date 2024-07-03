"use client";

import { useContext, useState } from "react";
import CommentList from "./comment-list";
import CreateCommentForm from "./form/create-comment-form";
import Modal from "./modal";
import { PostContext } from "@/context/user-context";

export default function OpenCommentsButton() {
  const [toggle, setToggle] = useState(false);
  const post = useContext(PostContext);
  return (
    <>
      <button onClick={() => setToggle(true)}>
        <svg
          className="fill-white"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24">
          <path d="M21.414 18.586l2.586-2.586v8h-8l2.586-2.586-5.172-5.172 2.828-2.828 5.172 5.172zm-13.656-8l2.828-2.828-5.172-5.172 2.586-2.586h-8v8l2.586-2.586 5.172 5.172zm10.828-8l-2.586-2.586h8v8l-2.586-2.586-5.172 5.172-2.828-2.828 5.172-5.172zm-8 13.656l-2.828-2.828-5.172 5.172-2.586-2.586v8h8l-2.586-2.586 5.172-5.172z" />
        </svg>
      </button>
      {toggle && (
        <Modal close={() => setToggle(false)}>
          <CommentList postId={post.id} />
          <CreateCommentForm postId={post.id} />
        </Modal>
      )}
    </>
  );
}
