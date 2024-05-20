import { lucia } from "@/auth/lucia";
import { cookies } from "next/headers";

export const validateRequest = async function () {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || "";

  if (!sessionId) {
    return { user: null, session: null };
  }

  const { user, session } = await lucia.validateSession(sessionId);

  if (!user || !session) {
    return { user: null, session: null };
  }

  return { user, session };
};
