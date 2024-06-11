import { prisma } from "./prisma";
import { generateIdFromEntropySize } from "lucia";

// CREATE
export const createPost = async (
  title: string,
  content: string,
  authorId: string
) => {
  try {
    const postId = generateIdFromEntropySize(10);
    let post = await prisma.post.create({
      data: {
        id: postId,
        title,
        content,
        authorId,
        likes: 0,
        dislikes: 0,
      },
    });
    return post;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// READ
export const getPosts = async () => {
  try {
    let posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  } catch (error) {
    console.error(error);
    return null;
  }
};
