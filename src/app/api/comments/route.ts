import {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
} from "@/db/comments";
import { NextRequest } from "next/server";

export async function POST(req: Request) {
  const { content, authorId, postId } = (await req.json()) as {
    content: string;
    authorId: string;
    postId: string;
  };

  if (!content || !authorId || !postId) {
    return new Response(
      JSON.stringify({
        comment: null,
        message: "Missing content, authorId, or postId",
      }),
      { status: 400 }
    );
  }

  const comment = await createComment(content, authorId, postId);

  if (!comment) {
    return new Response(
      JSON.stringify({ comment: null, message: "Failed to create comment" }),
      { status: 500 }
    );
  }

  return new Response(JSON.stringify({ comment, message: "Success" }), {
    status: 201,
  });
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const postId = searchParams.get("postId");

  if (!postId) {
    return new Response(
      JSON.stringify({
        comments: null,
        message: "Missing postId",
      }),
      { status: 400 }
    );
  }

  const comments = await getCommentsByPostId(postId);

  if (!comments) {
    return new Response(
      JSON.stringify({ comments: null, message: "Failed to get comments" }),
      { status: 500 }
    );
  }

  return new Response(JSON.stringify({ comments, message: "Success" }), {
    status: 200,
  });
}

export async function PUT(req: Request) {
  const { commentId, content } = (await req.json()) as {
    commentId: string;
    content?: string;
  };

  if (!commentId || !content) {
    return new Response(
      JSON.stringify({
        comment: null,
        message: "Missing commentId or content",
      }),
      { status: 400 }
    );
  }

  const comment = await updateComment(commentId, content);

  if (!comment) {
    return new Response(
      JSON.stringify({ comment: null, message: "Failed to update comment" }),
      { status: 500 }
    );
  }

  return new Response(JSON.stringify({ comment, message: "Success" }), {
    status: 200,
  });
}

export async function DELETE(req: Request) {
  const { commentId } = (await req.json()) as { commentId: string };

  if (!commentId) {
    return new Response(
      JSON.stringify({
        comment: null,
        message: "Missing commentId",
      }),
      { status: 400 }
    );
  }

  const comment = await deleteComment(commentId);

  if (!comment) {
    return new Response(
      JSON.stringify({ comment: null, message: "Failed to delete comment" }),
      { status: 500 }
    );
  }

  return new Response(JSON.stringify({ comment, message: "Success" }), {
    status: 200,
  });
}
