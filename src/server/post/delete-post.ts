"use server";

import { deletePost } from "@/db/posts";
import { validateRequest } from "@/auth/validate";
import { revalidatePath } from "next/cache";

export async function deletePostAction(postId: string, _: unknown) {
  const { user, session } = await validateRequest();

  if (!user || !session) {
    return {
      authError: "You must be logged in to delete a post",
    };
  }

  const post = await deletePost(postId);

  if (!post) {
    return {
      serverError: "Failed to delete post",
    };
  }

  revalidatePath("/");

  return { success: "Deleted post successfully" };
}
