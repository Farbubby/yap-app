import { createUser } from "@/db/users";

export async function POST(req: Request) {
  const { alias, username, password } = (await req.json()) as {
    alias: string;
    username: string;
    password: string;
  };

  const user = await createUser(alias, username, password);

  if (!user) {
    return Response.error();
  } else {
    return Response.json({ user });
  }
}
