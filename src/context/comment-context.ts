import { createContext } from "react";

export const CommentContext = createContext(
  {} as {
    id: string;
    author: string;
    content: string;
    date: string;
    numLikes: number;
    numDislikes: number;
  }
);
