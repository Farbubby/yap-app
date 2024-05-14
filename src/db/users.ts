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
    let user = await prisma.users.create({
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
export const getUser = async (username: string) => {
  return prisma.users.findUnique({
    where: {
      username,
    },
  });
};

export const getUsers = async () => {
  return prisma.users.findMany();
};

// UPDATE
export const updateUser = async (
  username: string,
  alias: string,
  password: string
) => {
  return prisma.users.update({
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
  return prisma.users.delete({
    where: {
      username,
    },
  });
};
