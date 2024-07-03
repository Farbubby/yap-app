"use client";

import { handleUpdateComment } from "@/server/comment/update-comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TextArea from "../text-area";

interface UpdateCommentFormProps {
  commentId: string;
  postId: string;
}

export default function UpdateCommentForm({
  commentId,
  postId,
}: UpdateCommentFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: FormData) =>
      handleUpdateComment(formData, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  return (
    <>
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-2xl font-bold">Want to update your comment?</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate(new FormData(e.target as HTMLFormElement));
          }}
          className="flex flex-col gap-4 w-full">
          <TextArea
            id="content"
            label="Update this comment"
            name="content"
            rows={10}
            cols={10}
            placeholder="Content"
            error=""
          />
          <button
            type="submit"
            className="rounded-lg bg-gray-900 text-white py-1 hover:bg-gray-800 cursor-pointer">
            Update
          </button>
        </form>
      </div>
    </>
  );
}
