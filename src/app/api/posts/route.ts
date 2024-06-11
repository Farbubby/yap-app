import { createPost, getPosts } from "@/db/posts";

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

export async function GET() {
  const posts = await getPosts();

  if (!posts) {
    return new Response(
      JSON.stringify({ posts: null, message: "Failed to get posts" }),
      { status: 500 }
    );
  }

  return new Response(JSON.stringify({ posts, message: "Success" }), {
    status: 200,
  });
}
