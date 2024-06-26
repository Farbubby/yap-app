import Post from "@/components/post";
import { getPosts } from "@/db/posts";

export default async function PostList() {
  const posts = await getPosts();

  if (!posts) {
    return <div>Failed to fetch posts</div>;
  }

  const postList = posts.map((post) => (
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
