"use server";

import { createPost, getPosts, updatePost, deletePost } from "@/db/posts";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { validateRequest } from "@/auth/validate";

const UpdatePostSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export async function handleUpdatePost(postId: string, formData: FormData) {
  const { user, session } = await validateRequest();

  if (!user || !session) {
    return {
      authError: "You must be logged in to create a post",
    };
  }

  const userInput = Object.fromEntries(formData.entries());
  const parsed = UpdatePostSchema.safeParse(userInput);

  if (!parsed.success) {
    const error = parsed.error.flatten();

    return {
      fieldError: {
        title: error.fieldErrors.title?.[0],
        content: error.fieldErrors.content?.[0],
      },
    };
  }

  const { title, content } = parsed.data;

  const post = await updatePost(postId, title, content);

  if (!post) {
    return {
      serverError: "Failed to update post",
    };
  }

  return { success: "Updated post successfully" };
}
