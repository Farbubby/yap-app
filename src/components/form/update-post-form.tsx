"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUpdatePost } from "@/server/post/update-post";
import TextArea from "../text-area";
import Input from "../input";
import { PostContext } from "@/context/user-context";
import { useContext } from "react";

export default function UpdatePostForm() {
  const queryClient = useQueryClient();

  const selectedPost = useContext(PostContext);

  const mutation = useMutation({
    mutationFn: (formData: FormData) =>
      handleUpdatePost(selectedPost.id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <>
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-2xl font-bold">Want to update this post?</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate(new FormData(e.target as HTMLFormElement));
          }}
          className="flex flex-col gap-5 w-full">
          <Input
            id="title"
            label="Title"
            name="title"
            type="text"
            placeholder="Title"
            error=""
          />
          <TextArea
            id="content"
            label="Content"
            name="content"
            rows={10}
            cols={10}
            placeholder="Content"
            error=""
          />
          <button
            type="submit"
            className="rounded-lg bg-gray-900 text-white py-1 hover:bg-gray-800 cursor-pointer">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
