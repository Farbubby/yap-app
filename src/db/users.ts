import { prisma } from "./prisma";

// CREATE
export const createUser = async (
  alias: string,
  username: string,
  password: string
) => {
  return prisma.user.create({
    data: {
      alias,
      username,
      password,
    },
  });
};

// GET
export const getUser = async (username: string) => {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
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
