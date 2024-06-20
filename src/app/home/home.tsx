"use client";

import { User } from "lucia";
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";
import Post from "@/components/post";
import Footer from "@/components/footer";
import CreatePostModal from "@/components/create-post-modal";
import UpdatePostModal from "@/components/update-post-modal";
import DeletePostModal from "@/components/delete-post-modal";
import { UserContext } from "@/context/user-context";

interface HomeProps {
  user: User;
}

export default function Home({ user }: HomeProps) {
  const [toggleCreatePostModal, setToggleCreatePostModal] = useState(false);
  const [toggleUpdatePostModal, setToggleUpdatePostModal] = useState(false);
  const [toggleDeletePostModal, setToggleDeletePostModal] = useState(false);
  const [postId, setPostId] = useState("");
  const [postList, setPostList] = useState([]);

  const posts = postList.map(
    (post: {
      id: string;
      title: string;
      authorId: string;
      content: string;
      createdAt: string;
      likes: number;
      dislikes: number;
    }) => (
      <Post
        key={post.id}
        id={post.id}
        title={post.title}
        author={post.authorId}
        content={post.content}
        date={post.createdAt}
        numLikes={post.likes}
        numDislikes={post.dislikes}
        selectId={setPostId}
        toggleUpdate={setToggleUpdatePostModal}
        toggleDelete={setToggleDeletePostModal}
      />
    )
  );

  useEffect(() => {
    if (
      toggleCreatePostModal ||
      toggleUpdatePostModal ||
      toggleDeletePostModal
    ) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  });

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      console.log(data);
      setPostList(data.posts);
    };
    getPosts();
  }, []);

  return (
    <>
      <UserContext.Provider value={user}>
        <div>
          <Navbar />
          <div className="flex flex-col items-center gap-10 py-28">{posts}</div>
          <Footer toggle={setToggleCreatePostModal} />
        </div>
        {toggleCreatePostModal && (
          <CreatePostModal close={() => setToggleCreatePostModal(false)} />
        )}
        {toggleUpdatePostModal && (
          <UpdatePostModal
            postId={postId}
            close={() => setToggleUpdatePostModal(false)}
          />
        )}
        {toggleDeletePostModal && (
          <DeletePostModal
            postId={postId}
            close={() => setToggleDeletePostModal(false)}
          />
        )}
      </UserContext.Provider>
    </>
  );
}
