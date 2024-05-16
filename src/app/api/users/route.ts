import { createUser, getUserByUsername } from "@/db/users";
import { NextRequest } from "next/server";

export async function POST(req: Request) {
  const { alias, username, password } = (await req.json()) as {
    alias: string;
    username: string;
    password: string;
  };

  if (!alias || !username || !password) {
    return new Response("Missing alias, username, or password", {
      status: 400,
    });
  }

  if (password.length < 8) {
    return new Response("Password must be at least 8 characters long", {
      status: 400,
    });
  }

  const user = await createUser(alias, username, password);

  if (!user) {
    return new Response("Username is taken", { status: 409 });
  }

  return new Response(JSON.stringify(user), { status: 201 });
}

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
