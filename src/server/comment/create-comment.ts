"use server";

import {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
} from "@/db/comments";
import { z } from "zod";
import { validateRequest } from "@/auth/validate";

const CreateCommentSchema = z.object({
  content: z.string().min(1, "Content must be at least 1 character long"),
});

export async function handleCreateComment(formData: FormData, postId: string) {
  const { user, session } = await validateRequest();

  if (!user || !session) {
    return {
      authError: "You must be logged in to create a comment",
    };
  }

  const userInput = Object.fromEntries(formData.entries());
  const parsed = CreateCommentSchema.safeParse(userInput);

  if (!parsed.success) {
    const error = parsed.error.flatten();

    return {
      fieldError: {
        content: error.fieldErrors.content?.[0],
      },
    };
  }

  const { content } = parsed.data;

  const comment = await createComment(content, user.id, postId);

  if (!comment) {
    return {
      serverError: "Failed to create comment",
    };
  }

  return { success: "Submitted comment successfully" };
}
