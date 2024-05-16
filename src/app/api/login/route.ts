import { getUserByUsername } from "@/db/users";
import { NextRequest } from "next/server";
import { lucia } from "@/auth/lucia";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username");
  const password = req.nextUrl.searchParams.get("password");

  if (!username || !password) {
    return new Response("Missing username or password", { status: 400 });
  }

  const user = await getUserByUsername(username);

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  if (user.password !== password) {
    return new Response("Password is not correct", { status: 401 });
  }

  const session = await lucia.createSession(user.id, {});

  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return new Response(JSON.stringify(user), { status: 200 });
}
