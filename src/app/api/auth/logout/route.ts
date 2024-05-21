import { lucia } from "@/auth/lucia";
import { cookies } from "next/headers";
import { validateRequest } from "@/auth/validate";

export async function DELETE() {
  const { session } = await validateRequest();

  if (!session) {
    return new Response(JSON.stringify({ message: "No session found" }), {
      status: 404,
    });
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return new Response(JSON.stringify({ message: "Success" }), { status: 200 });
}
