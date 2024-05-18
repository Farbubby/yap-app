import { getUserByUsername } from "@/db/users";
import { NextRequest } from "next/server";
import { lucia } from "@/auth/lucia";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username");
  const password = req.nextUrl.searchParams.get("password");

  if (!username || !password) {
    return new Response(
      JSON.stringify({
        user: null,
        session: null,
        message: "Missing username or password",
      }),
      { status: 400 }
    );
  }

  const user = await getUserByUsername(username);

  if (!user) {
    return new Response(
      JSON.stringify({
        user: null,
        session: null,
        message: "Username does not exist",
      }),
      { status: 404 }
    );
  }

  if (user.password !== password) {
    return new Response(
      JSON.stringify({
        user: null,
        session: null,
        message: "Password is not correct",
      }),
      { status: 401 }
    );
  }

  // Make sure only one session is active at a time for the user
  await lucia.invalidateUserSessions(user.id);
  await lucia.deleteExpiredSessions();

  const session = await lucia.createSession(user.id, {});

  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return new Response(JSON.stringify({ user, session, message: "Success" }), {
    status: 200,
  });
}
