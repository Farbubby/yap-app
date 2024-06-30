"use client";

import Post from "@/components/post";
import { getPosts } from "@/db/posts";
import { useQuery } from "@tanstack/react-query";

export default function PostList() {
  const query = useQuery({ queryKey: ["posts"], queryFn: () => getPosts() });

  if (query.isLoading) {
    return (
      <div className="flex flex-col items-center gap-10 py-28">Loading...</div>
    );
  }

  if (query.isError) {
    return (
      <div className="flex flex-col items-center gap-10 py-28">
        Error loading posts
      </div>
    );
  }

  if (!query.data) {
    return (
      <div className="flex flex-col items-center gap-10 py-28">
        Be the first to post!
      </div>
    );
  }

  const postList = query.data.map((post) => (
    <Post
      key={post.id}
      id={post.id}
      title={post.title}
      author={post.authorId}
      content={post.content}
      date={post.createdAt.toDateString()}
      numLikes={post.likes}
      numDislikes={post.dislikes}
    />
  ));

  return (
    <>
      <div className="flex flex-col items-center gap-10 py-28">{postList}</div>
    </>
  );
}
