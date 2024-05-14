import { Lucia, TimeSpan } from "lucia";
import { prisma } from "@/db/prisma";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

export const adapter = new PrismaAdapter(prisma.sessions, prisma.users);

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(1, "d"),
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      alias: attributes.alias,
      username: attributes.username,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  alias: string;
  username: string;
}
