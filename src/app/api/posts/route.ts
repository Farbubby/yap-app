import { createPost } from "@/db/posts";

export async function POST(req: Request) {
  const { title, content, authorId } = (await req.json()) as {
    title: string;
    content: string;
    authorId: string;
  };

  if (!title || !content || !authorId) {
    return new Response(
      JSON.stringify({
        post: null,
        message: "Missing title, content, or authorId",
      }),
      {
        status: 400,
      }
    );
  }

  const post = await createPost(title, content, authorId);

  if (!post) {
    return new Response(
      JSON.stringify({ post: null, message: "Failed to create post" }),
      { status: 500 }
    );
  }

  return new Response(JSON.stringify({ post, message: "Success" }), {
    status: 201,
  });
}
