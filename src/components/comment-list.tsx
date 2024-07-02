"use client";

import Comment from "./comment";
import { useQuery } from "@tanstack/react-query";
import { getCommentsByPostId } from "@/db/comments";

interface CommentListProps {
  postId: string;
}

export default function CommentList({ postId }: CommentListProps) {
  const query = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsByPostId(postId),
  });

  if (query.isLoading) {
    return (
      <div className="flex flex-col overflow-y-scroll h-96 text-white text-center">
        Loading comments...
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="flex flex-col overflow-y-scroll h-96 text-white text-center">
        Error loading comments
      </div>
    );
  }

  if (!query.data || query.data.length === 0) {
    return (
      <div className="flex flex-col overflow-y-scroll h-96 text-white text-center">
        Be the first to comment!
      </div>
    );
  }

  const end = query.data.length - 1;

  const commentsList = query.data.map((comment, index: number) => {
    if (index === end) {
      return (
        <Comment
          key={comment.id}
          id={comment.id}
          content={comment.content}
          author={comment.authorId}
          date={comment.createdAt.toDateString()}
          numLikes={comment.likes}
          numDislikes={comment.dislikes}
        />
      );
    }
    return (
      <div key={comment.id} className="border-b">
        <Comment
          key={comment.id}
          id={comment.id}
          content={comment.content}
          author={comment.authorId}
          date={comment.createdAt.toDateString()}
          numLikes={comment.likes}
          numDislikes={comment.dislikes}
        />
      </div>
    );
  });

  return (
    <>
      <div className="flex flex-col overflow-y-scroll h-96">{commentsList}</div>
    </>
  );
}
