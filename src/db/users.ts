import { prisma } from "./prisma";
import { generateIdFromEntropySize } from "lucia";

// CREATE
export const createUser = async (
  alias: string,
  username: string,
  password: string
) => {
  try {
    const userId = generateIdFromEntropySize(10);
    let user = await prisma.user.create({
      data: {
        id: userId,
        alias,
        username,
        password,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// GET
export const getUserByUsername = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUsers = async () => {
  return prisma.user.findMany();
};

// UPDATE
export const updateUser = async (
  username: string,
  alias: string,
  password: string
) => {
  return prisma.user.update({
    where: {
      username,
    },
    data: {
      alias,
      username,
      password,
    },
  });
};

// DELETE
export const deleteUser = async (username: string) => {
  return prisma.user.delete({
    where: {
      username,
    },
  });
};
