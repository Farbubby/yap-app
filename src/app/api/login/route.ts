import { getUserByUsername } from "@/db/users";
import { NextRequest } from "next/server";

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

  return new Response(JSON.stringify(user), { status: 200 });
}
