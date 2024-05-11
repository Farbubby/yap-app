import { prisma } from "./client";

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
