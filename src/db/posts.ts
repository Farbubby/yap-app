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

// UPDATE
export const updatePost = async (
  postId: string,
  title?: string,
  content?: string
) => {
  try {
    if (!title && !content) {
      return "No changes";
    } else if (!title) {
      let post = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          content,
        },
      });
      return post;
    } else if (!content) {
      let post = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          title,
        },
      });
      return post;
    } else {
      let post = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          title,
          content,
        },
      });
      return post;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// DELETE
export const deletePost = async (postId: string) => {
  try {
    let post = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return post;
  } catch (error) {
    console.error(error);
    return null;
  }
};
