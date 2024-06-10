"use client";

import { User } from "lucia";
import Navbar from "@/components/navbar";
import { createContext } from "react";
import Post from "@/components/post";
import Footer from "@/components/footer";

interface HomeProps {
  user: User;
}

export const UserContext = createContext({} as User);

export default function Home({ user }: HomeProps) {
  return (
    <>
      <UserContext.Provider value={user}>
        <div>
          <Navbar />
          <div className="flex flex-col items-center gap-10 py-28">
            <Post
              title="Hi"
              author="Joe"
              content="I like chicken"
              date="January 4"
              numLikes={4}
              numDislikes={2}
            />
            <Post
              title="Hello"
              author="Jane"
              content="I like fish"
              date="January 5"
              numLikes={5}
              numDislikes={1}
            />
            <Post
              title="Hey"
              author="John"
              content="I like beef"
              date="January 6"
              numLikes={6}
              numDislikes={0}
            />
          </div>
          <Footer />
        </div>
      </UserContext.Provider>
    </>
  );
}
