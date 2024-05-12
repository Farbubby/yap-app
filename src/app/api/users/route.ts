import { createUser, getUser } from "@/db/users";

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

  if (await getUser(username)) {
    return new Response("Username already exists", { status: 409 });
  }

  const user = await createUser(alias, username, password);

  if (!user) {
    return new Response("Failed to create user", { status: 500 });
  }

  return new Response(JSON.stringify(user), { status: 201 });
}
