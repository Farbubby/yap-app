"use client";

import { User } from "lucia";
import Navbar from "@/components/navbar";
import { createContext, useState, useEffect } from "react";
import Post from "@/components/post";
import Footer from "@/components/footer";
import PostFormModal from "@/components/post-form-modal";

interface HomeProps {
  user: User;
}

export const UserContext = createContext({} as User);

export default function Home({ user }: HomeProps) {
  const [toggleModal, setToggleModal] = useState(false);
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
        title={post.title}
        author={post.authorId}
        content={post.content}
        date={post.createdAt}
        numLikes={post.likes}
        numDislikes={post.dislikes}
      />
    )
  );

  useEffect(() => {
    if (toggleModal) {
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
          <Footer toggle={setToggleModal} />
        </div>
        {toggleModal && <PostFormModal close={() => setToggleModal(false)} />}
      </UserContext.Provider>
    </>
  );
}
