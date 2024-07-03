"use server";

import {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
} from "@/db/comments";
import { validateRequest } from "@/auth/validate";

export async function handleDeleteComment(commentId: string) {
  const { user, session } = await validateRequest();

  if (!user || !session) {
    return {
      authError: "You must be logged in to delete a comment",
    };
  }

  const comment = await deleteComment(commentId);

  if (!comment) {
    return {
      serverError: "Failed to delete comment",
    };
  }

  return { success: "Deleted comment successfully" };
}
