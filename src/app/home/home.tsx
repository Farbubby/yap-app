"use client";

import { User } from "lucia";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { UserContext } from "@/context/user-context";

interface HomeProps {
  user: User;
  children: React.ReactNode;
}

export default function Home({ user, children }: HomeProps) {
  return (
    <>
      <UserContext.Provider value={user}>
        <div>
          <Navbar />
          {children}
          <Footer />
        </div>
      </UserContext.Provider>
    </>
  );
}
