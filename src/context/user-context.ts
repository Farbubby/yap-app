import { createContext } from "react";
import { User } from "lucia";

export const UserContext = createContext({} as User);
export const PostContext = createContext(
  {} as {
    id: string;
    title: string;
    author: string;
    content: string;
    date: string;
    numLikes: number;
    numDislikes: number;
  }
);
