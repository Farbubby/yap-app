"use server";

import { createPost, getPosts, updatePost, deletePost } from "@/db/posts";
import { z } from "zod";
import { validateRequest } from "@/auth/validate";
import { revalidateTag, revalidatePath } from "next/cache";

const CreatePostSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character long"),
  content: z.string().min(1, "Content must be at least 1 character long"),
});

export async function createPostAction(_: unknown, formData: FormData) {
  const { user, session } = await validateRequest();

  if (!user || !session) {
    return {
      authError: "You must be logged in to create a post",
    };
  }

  const userInput = Object.fromEntries(formData.entries());
  const parsed = CreatePostSchema.safeParse(userInput);

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

  const post = await createPost(title, content, user.id);

  if (!post) {
    return {
      serverError: "Failed to create post",
    };
  }

  revalidatePath("/");

  return { success: "Submitted post successfully" };
}
