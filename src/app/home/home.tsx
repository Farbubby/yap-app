"use client";

import { User } from "lucia";
import Navbar from "@/components/navbar";
import { createContext } from "react";

interface HomeProps {
  user: User;
}

export const UserContext = createContext({} as User);

export default function Home({ user }: HomeProps) {
  return (
    <>
      <UserContext.Provider value={user}>
        <div className="bg-gray-950 h-screen">
          <Navbar />
          <div>
            You logged in {user.id} {user.alias} {user.username} yay!!!
          </div>
        </div>
      </UserContext.Provider>
    </>
  );
}
