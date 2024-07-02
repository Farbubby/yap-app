"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleCreateComment } from "@/server/comment/create-comment";
import TextArea from "./text-area";
import Input from "./input";

interface CreateCommentFormProps {
  postId: string;
}

export default function CreateCommentForm({ postId }: CreateCommentFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: FormData) => handleCreateComment(formData, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate(new FormData(e.target as HTMLFormElement));
        }}
        className="flex flex-col gap-4 justify-center">
        <Input
          id="comment"
          label="Comment"
          name="content"
          type="text"
          placeholder="Comment"
          error=""
        />
        <button
          type="submit"
          className="rounded-lg bg-gray-900 text-white py-1 hover:bg-gray-800 cursor-pointer p-2">
          Comment
        </button>
      </form>
    </>
  );
}
