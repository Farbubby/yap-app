import { prisma } from "./prisma";
import { generateIdFromEntropySize } from "lucia";

// CREATE
export const createComment = async (
  content: string,
  authorId: string,
  postId: string
) => {
  try {
    const commentId = generateIdFromEntropySize(10);
    let comment = await prisma.comment.create({
      data: {
        id: commentId,
        content,
        authorId,
        postId,
        likes: 0,
        dislikes: 0,
      },
    });
    return comment;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// READ
export const getCommentsByPostId = async (postId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return comments;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// UPDATE
export const updateComment = async (commentId: string, content?: string) => {
  try {
    if (!content) {
      return "No changes";
    }
    let comment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content,
      },
    });
    return comment;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// DELETE
export const deleteComment = async (commentId: string) => {
  try {
    let comment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return comment;
  } catch (error) {
    console.error(error);
    return null;
  }
};
