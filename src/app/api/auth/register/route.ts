import { createUser, getUserByUsername } from "@/db/users";

export async function POST(req: Request) {
  const { alias, username, password } = (await req.json()) as {
    alias: string;
    username: string;
    password: string;
  };

  if (!alias || !username || !password) {
    return new Response(
      JSON.stringify({
        user: null,
        message: "Missing alias, username, or password",
      }),
      {
        status: 400,
      }
    );
  }

  if (password.length < 8) {
    return new Response(
      JSON.stringify({
        user: null,
        message: "Password must be at least 8 characters long",
      }),
      {
        status: 400,
      }
    );
  }

  if (await getUserByUsername(username)) {
    return new Response(
      JSON.stringify({ user: null, message: "Username is taken" }),
      { status: 409 }
    );
  }

  const user = await createUser(alias, username, password);

  if (!user) {
    return new Response(
      JSON.stringify({ user: null, message: "Failed to create user" }),
      { status: 500 }
    );
  }

  return new Response(JSON.stringify({ user, message: "Success" }), {
    status: 201,
  });
}
