import { lucia } from "@/auth/lucia";
import { cookies } from "next/headers";

export async function GET() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || "";

  if (!sessionId) {
    return new Response("No session found", { status: 401 });
  }

  const { user, session } = await lucia.validateSession(sessionId);

  if (!user || !session) {
    return new Response("Invalid session", { status: 401 });
  }

  return new Response(JSON.stringify(user), { status: 200 });
}
